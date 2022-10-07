package ssafy;

import java.io.*;
import java.util.*;

import java.sql.*;
import java.lang.Math;

import org.apache.hadoop.conf.*;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.io.*;
import org.apache.hadoop.io.compress.*;
import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

import org.json.simple.*;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import org.apache.hadoop.mapreduce.lib.input.FileSplit;

//import org.apache.hadoop.util.*;

public class ProcessMatch2 {

	public static class Player{

		public Player(JSONObject participant){
			
			teamPosition = (String) participant.get("teamPosition");
			win = (Boolean) participant.get("win");
			teamId = (long) participant.get("teamId");
			championName = (String) participant.get("championName");
			championId = (long) participant.get("championId");

			goldEarned = (long) participant.get("goldEarned");
			kills = (long) participant.get("kills");
			assists =(long)  participant.get("assists");
			deaths = (long) participant.get("deaths");

			magicDamageDealtToChampions = (long) participant.get("magicDamageDealtToChampions");
			physicalDamageDealtToChampions = (long) participant.get("physicalDamageDealtToChampions");
			trueDamageDealtToChampions = (long) participant.get("trueDamageDealtToChampions");

			totalMinionsKilled = (long) participant.get("totalMinionsKilled");
			champLevel = (long) participant.get("champLevel");
			champExperience = (long) participant.get("champExperience");
			
			timeCCingOthers = (long) participant.get("timeCCingOthers");
			damageDealtToBuildings = (long) participant.get("damageDealtToBuildings");

		}

		String teamPosition;
		boolean win;
		long teamId;
		String championName;
		long championId;
		//------------
		long goldEarned;
		long kills;
		long assists;
		long deaths;

		long magicDamageDealtToChampions;
		long physicalDamageDealtToChampions;
		long trueDamageDealtToChampions;

		long totalMinionsKilled;
		long champLevel;
		long champExperience;

		long timeCCingOthers;
		long damageDealtToBuildings;

		int midJungleOrder;
		int topJungleOrder;
		int botDuoOrder;
		
	}
	
	public static class Team{

		public Team(JSONObject team, long gameDuration){
			JSONArray bans = (JSONArray) team.get("bans");
			
			teamId = (long) team.get("teamId");
			teamBans = new long[5];
			for(int i = 0; i < bans.size(); i++){
				JSONObject ban = (JSONObject) bans.get(i);
				teamBans[i]= (long) ban.get("championId");
			}
			
			JSONObject objectives = (JSONObject) team.get("objectives");
			teamChampionKills = (long) ( (JSONObject) objectives.get("champion")).get("kills");
			teamDragonKills = (long) ( (JSONObject) objectives.get("baron")).get("kills");
			teamBaronKills = (long) ( (JSONObject) objectives.get("dragon")).get("kills");
			teamRiftHeraldKills = (long) ( (JSONObject) objectives.get("riftHerald")).get("kills");

			this.gameDuration = gameDuration;
		}

		long gameDuration;
		long [] teamBans;
		long teamId;
		long teamChampionKills;
		long teamDragonKills;
		long teamBaronKills;
		long teamRiftHeraldKills;
	}

	public static class Player15min {

		public Player15min(){
			kills = 0;
			assists = 0;
			deaths = 0;
		}

		public void setFromResult(Player player){
			this.teamId = player.teamId;
			this.championName = player.championName;
			this.teamPosition = player.teamPosition;
			this.championId = player.championId;
		}

		public void setFromParticipantFrame(JSONObject participantFrame){
			this.goldEarned = (long) participantFrame.get("totalGold");

			JSONObject damageStats = (JSONObject) participantFrame.get("damageStats");

			this.magicDamageDealtToChampions = (long) damageStats.get("magicDamageDoneToChampions");
			this.physicalDamageDealtToChampions = (long) damageStats.get("physicalDamageDoneToChampions");
			this.trueDamageDealtToChampions = (long) damageStats.get("trueDamageDoneToChampions");

			this.totalMinionsKilled = (long) participantFrame.get("minionsKilled");
			this.champLevel = (long) participantFrame.get("level");
			this.champExperience = (long) participantFrame.get("xp");
		}
		long teamId;
		String championName;
		String teamPosition;
		long championId;
		//-----------------

		long goldEarned;

		long kills;
		long assists;
		long deaths;

		long magicDamageDealtToChampions;
		long physicalDamageDealtToChampions;
		long trueDamageDealtToChampions;

		long totalMinionsKilled;
		long champLevel;
		long champExperience;


	}

	public static class Team15min{
		long teamChampionKills;
		long teamDragonKills;
		long teamBaronKills;
		long teamRiftHeraldKills;
	}

	/*
	 * Map class part
	 */

	public static class MapClass1 extends Mapper<Object, Text, Text, Text> {

		public static String [] tiers = {"CHALLENGER", "GRANDMASTER", "MASTER", "DIAMOND", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON"};
	
		public static String topJungleKeyStr = "doubleRelationTopJungle_";
		public static String midJungleKeyStr = "doubleRelationMidJungle_";
		public static String botDuoKeyStr = "doubleRelationBotDuo_";

		
		public static Text emitkey = new Text ();
		public static Text emitval = new Text ();

		// Text : input line
		// --> format = <point id> \tab <dimension 1> \tab <dimension 2>
		public void map (Object key, Text value, Context context) throws IOException, InterruptedException
		{

			String filename = ((FileSplit) context.getInputSplit()).getPath().getName();
			String tier = filename.split("_", 2)[0];
			String roughTier = "low";
			for(int i = 0; i < tiers.length; i++){
				if(tiers[i].equals(tier)){
					if(i <= 3){
						roughTier = "high";
						break;
					} 
					else if (i <= 5){
						roughTier = "mid";
						break;
					}
				}
				
			}

			JSONParser parser = new JSONParser();
			JSONObject matchOne = new JSONObject();
			try{
				matchOne = (JSONObject) parser.parse(value.toString());

			} catch( ParseException e){
				return;
			}


			
			JSONObject matchResult = (JSONObject) matchOne.get("match_result");
			JSONObject matchTimeline = (JSONObject) matchOne.get("match_timeline");
			JSONObject info = (JSONObject) matchResult.get("info");
			JSONArray participants = (JSONArray) info.get("participants");
							
			List<Player> players = new ArrayList<>();	
			// Team blue 100 / Team Red 200
			ArrayList<Team> teams = new ArrayList<>();
			long gameDuration = 1;

			//gameDuration
			if(info.containsKey("gameEndTimestamp")){
				gameDuration = (long) info.get("gameDuration");
			}
			else {
				gameDuration = ((long) info.get("gameDuration"))/1000 ;
			}

			//set Team Data
			JSONArray ts = (JSONArray) info.get("teams");
			Team tempt1 = new Team((JSONObject) ts.get(0), gameDuration);
			Team tempt2 = new Team((JSONObject) ts.get(1), gameDuration);

			if(tempt1.teamId == 100){
				teams.add(tempt1);
				teams.add(tempt2);
			}
			else {
				teams.add(tempt2);
				teams.add(tempt1);
			}

			//for sorting ids
			String[][] idsAndIdx = new String[2][5];

			//set Participant Data
			for(int i = 0; i < participants.size(); i ++) {
				JSONObject participant = (JSONObject)  participants.get(i);
				Player player = new Player(participant);
				players.add(player);				

				int teamIdx = 0;
				if(player.teamId == 200){
					teamIdx = 1;
				}
				
				switch(player.teamPosition){
					case "TOP":
						idsAndIdx[teamIdx][0] = player.championId + "_" + i;
						break;
					case "JUNGLE":
						idsAndIdx[teamIdx][1] = player.championId + "_" + i;
						break;
					case "MIDDLE":
						idsAndIdx[teamIdx][2] = player.championId + "_" + i;
						break;
					case "BOTTOM":
						idsAndIdx[teamIdx][3] = player.championId + "_" + i;
						break;
					case "UTILITY":
						idsAndIdx[teamIdx][4] = player.championId + "_" + i;
						break;
				}
				
			}

			// // compare top ids
			// int midJungleFirstTeamIdx = 0;
			// int topJungleFirstTeamIdx = 0;
			// int botDuoFirstTeamIdx = 0;	

			// int [] midJungleIdx = {2,1};
			// int [] topJungleIdx = {0,1};
			// int [] botDuoIdx = {3,4};

			// if(idsAndIdx[0][0].compareTo(idsAndIdx[1][0]) > 0 ){
			// 	midJungleFirstTeamIdx = 1;
			// }
			// if(idsAndIdx[0][2].compareTo(idsAndIdx[1][2]) > 0){
			// 	topJungleFirstTeamIdx = 1;
			// }
			// if(idsAndIdx[0][3].compareTo(idsAndIdx[1][3]) > 0){
			// 	botDuoFirstTeamIdx = 1;
			// }

			// midJungleKeyStr += roughTier + "_";
			// topJungleKeyStr = roughTier + "_";
			// botDuoKeyStr = roughTier + "_";

			// for(int i = 0; i < 2; i++){
			// 	int order = 1;
			// 	for(int j = 0; j < 2; j++){
			// 		int idx = Integer.parseInt(idsAndIdx[(midJungleFirstTeamIdx + i)%2][midJungleIdx[j]].split("_")[1]);
			// 		Player p = players.get(idx);
			// 		p.midJungleOrder = order;
			// 		players.set(idx, p);
			// 		midJungleKeyStr += p.championId + "_";

			// 		order ++;
			// 	}
			// 	order++;
			// }
			// midJungleKeyStr = midJungleKeyStr.substring(0, midJungleKeyStr.length() - 1);

			// for(int i = 0; i < 2; i++){
			// 	int order = 1;
			// 	for(int j = 0; j < 2; j++){
			// 		int idx = Integer.parseInt(idsAndIdx[(topJungleFirstTeamIdx + i)%2][topJungleIdx[j]].split("_")[1]);
			// 		Player p = players.get(idx);
			// 		p.topJungleOrder = order;
			// 		players.set(idx, p);
			// 		topJungleKeyStr += p.championId + "_";

			// 		order ++;
			// 	}
			// 	order++;
			// }
			// topJungleKeyStr = topJungleKeyStr.substring(0, topJungleKeyStr.length() - 1);

			// for(int i = 0; i < 2; i++){
			// 	int order = 1;
			// 	for(int j = 0; j < 2; j++){
			// 		int idx = Integer.parseInt(idsAndIdx[(botDuoFirstTeamIdx + i)%2][botDuoIdx[j]].split("_")[1]);
			// 		Player p = players.get(idx);
			// 		p.botDuoOrder = order;
			// 		players.set(idx, p);
			// 		botDuoKeyStr += p.championId + "_";

			// 		order ++;
			// 	}
			// 	order++;
			// }
			// botDuoKeyStr = botDuoKeyStr.substring(0, botDuoKeyStr.length() - 1);


			//relation job
			String mapType = "";
			String keyStr = "";

			for(int i = 0; i < players.size(); i++){
	
				for(int j = i + 1; j < players.size(); j++){

					Player p1 = players.get(i);
					Player p2 = players.get(j);

					Team team1 = teams.get(0);
					Team team2 = teams.get(1);

					if(p1.championId > p2.championId){
						Player tmpP = p1;
						p1 = p2;
						p2 = tmpP;
					}

					if(p1.teamId != 100){
						Team tmpT = team1;
						team1 = team2;
						team2 = tmpT;
					}

					boolean rival = false;

					if(p1.teamId == p2.teamId){
						mapType = "singleRelationTeam";
					}
					else {
						mapType = "singleRelationEnemy";
						if(p1.teamPosition.equals(p2.teamPosition)){
							rival = true;
						}
					}

					keyStr = mapType + "_" + roughTier +  "_" + p1.teamPosition + "_" + p1.championId +  "_" 
					+ p2.teamPosition + "_" + p2.championId +  "_" ;
					emitkey.set(keyStr + "win" );

					String v = "";
					if(p1.win){
						v = "1";
					}
					else{
						v = "0";
					}
					emitval.set(v);
					context.write(emitkey, emitval);

					emitkey.set(keyStr + "matchNum");
					emitval.set("1");
					context.write(emitkey, emitval);

					if(!rival){
						continue;
					}

					mapType = "singleRelationRival";
					keyStr = mapType + "_" + roughTier + "_" +  p1.teamPosition + "_" +  p1.championId + "_" + p2.championId +  "_";

					splitData(keyStr, p1, team1, "1", context);
					splitData(keyStr, p2, team2, "2", context);


				}
				Player pi = players.get(i);
				Team teami = teams.get(0);

				if(pi.teamId != 100){
					teami = teams.get(1);
				}

				mapType = "noRelationCommon";
				keyStr = mapType + "_" + roughTier + "_" + pi.teamPosition + "_" + pi.championId + "_";

				splitData(keyStr, pi, teami, "", context);

				//Ban data1
				mapType = "championBans";
				keyStr = mapType + "_" + roughTier + "_" + pi.teamPosition + "_" + pi.championId + "_";

				for(long championId : teami.teamBans){
					if(championId == -1){
						continue;
					}

					emitkey.set(keyStr + championId);
					emitval.set("1");
					context.write(emitkey, emitval);
				}




			}
			//Ban data2
			mapType = "matchBans";
			keyStr = mapType + "_" + roughTier + "_";

			for(int i = 0; i < 2 ; i++){

				for(int j = 0; j < teams.get(i).teamBans.length; j++){
					if(teams.get(i).teamBans[j] == -1){
						continue;
					}
					emitkey.set(keyStr + teams.get(i).teamBans[j]);
					emitval.set("1");
					context.write(emitkey, emitval);
				}
			}
			
			
			
                        // ------------------------------------------------------

			//Timeline Data begins
			
			JSONArray frames = (JSONArray) ((JSONObject) matchTimeline.get("info")).get("frames");

			long timestampNear15min = -1;
        	JSONObject participantFrames = new JSONObject();

			List<Player15min> players15min = new ArrayList<>();
			List<Team15min> teams15min = new ArrayList<>();

			for(int i = 0; i < 10; i ++){
				players15min.add(new Player15min());
				Player15min p15 = new Player15min();
				p15.setFromResult(players.get(i));
				players15min.set(i, p15);
			}
			for(int i = 0; i < 2; i ++){
				teams15min.add(new Team15min());
			}

			// long [] lineSoloKills = new long[10];

        	// //[teamIdx] [] -> 0 : top jungle, 1: mid jungle, 2: botduo
        	// long [][] lineDuoKills = new long[2][3];

        	// // 0: baron (zero before 15min), 1: dragon, 2: riftHerald
        	long [][] eliteMonsterKills = new long[2][3];

			long[] kills = new long[10];
			long[] assists = new long[10];
			long[] deaths = new long[10];

			long[] teamKills = new long[2];

			for( Object f  : frames){

				JSONObject frame = (JSONObject) f;
				JSONObject pf = (JSONObject) frame.get("participantFrames");
				JSONArray events = (JSONArray) frame.get("events");

				long tsp = (long) frame.get("timestamp");

				for(Object e : events){
					JSONObject event = (JSONObject) e;
					String type = ((String) event.get("type"));
					if(!type.equals("CHAMPION_KILL")
							&& !(type.equals("ELITE_MONSTER_KILL")) ){
						continue;
					}

					int teamIdx = 0;
					if((long) event.get("killerId") > 5){
						teamIdx = 1;
					}

					Long l1 = 0l;
					switch(type){

						case "CHAMPION_KILL" :
							if(!event.containsKey("assistingParticipantIds")){
								l1 = (Long) event.get("killerId") - 1;

								// lineSoloKills[ l1.intValue()] ++;
							}
							else{
								JSONArray assistingParticipants = (JSONArray) event.get("assistingParticipantIds");
								for(Object o :  assistingParticipants){
									l1 = (Long) o - 1;
									assists[l1.intValue()]++;
								}
							}
							l1 = (long) event.get("killerId") - 1;
							if(l1 > 0){
								kills[l1.intValue()] ++;
								teamKills[teamIdx]++;
							}
							

							l1 = (long) event.get("victimId") - 1;
							deaths[l1.intValue()] ++;

							break;

						case "ELITE_MONSTER_KILL":
							switch((String) event.get("monsterType")){
								case "BARON" :
									eliteMonsterKills[teamIdx][0] ++;
									break;

								case "DRAGON" :
									eliteMonsterKills[teamIdx][1] ++;
									break;

								case "RIFTHERALD" :
									eliteMonsterKills[teamIdx][2] ++;
									break;
							}
							break;
					}

				}

				if(tsp < 900000 && tsp > timestampNear15min ){
					timestampNear15min = tsp;
					participantFrames = pf;
				}
				else{
					break;
				}
			}

			for(int i = 0; i < 10; i ++){

				JSONObject participantFrame = (JSONObject) participantFrames.get("" + (i + 1));
				Player15min p15 = players15min.get(i);
				p15.setFromParticipantFrame(participantFrame);
				p15.kills = kills[i];
				p15.assists = assists[i];
				p15.deaths = deaths[i];

				players15min.set(i, p15);
			}

			for(int i = 0; i < 2; i++){
				Team15min t15 = teams15min.get(i);
				t15.teamChampionKills = teamKills[i];
				t15.teamBaronKills = eliteMonsterKills[i][0];
				t15.teamDragonKills = eliteMonsterKills[i][1];
				t15.teamRiftHeraldKills = eliteMonsterKills[i][2];

				teams15min.set(i, t15);
			}

			for(int i = 0; i < players15min.size(); i++){
				for(int j = i + 1; j < players15min.size(); j ++){
					Player15min p1 = players15min.get(i);
					Player15min p2 = players15min.get(j);

					if(!p1.teamPosition.equals(p2.teamPosition)){
						continue;
					}

					Team15min t1 = teams15min.get(0);
					Team15min t2 = teams15min.get(1);

					if(p1.championId > p2.championId){
						Player15min tmpP = p1;
						p1 = p2;
						p2 = tmpP;
					}

					if(p1.teamId != 100){
						Team15min tmpT = t1;
						t1 = t2;
						t2 = tmpT;
					}

					mapType = "singleRelationRival";
					keyStr = mapType + "_" + roughTier + "_" +  p1.teamPosition + "_" +  p1.championId + "_" + p2.championId +  "_";
					
					splitData2(keyStr, p1, t1, "1", context);
					splitData2(keyStr, p2, t2, "2", context);
				
				}
			}

		}

		public static void splitData(String keyStr, Player player, Team team, String appendWord, Context context) 
			throws IOException, InterruptedException{

			
			emitkey.set(keyStr + "win" + appendWord);
			int win = 0;
			if(player.win){
				win = 1;
			}
			emitval.set("" + win);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "matchNum" + appendWord);
			emitval.set("1");
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "gameDuration" + appendWord);
			emitval.set("" + team.gameDuration);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "goldEarned" + appendWord);
			emitval.set("" + player.goldEarned);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "kills" + appendWord);
			emitval.set("" + player.kills);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "deaths"+ appendWord);
			emitval.set("" + player.deaths);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "assists" + appendWord);
			emitval.set("" + player.assists);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "magicDamageDealtToChampions" + appendWord);
			emitval.set("" + player.magicDamageDealtToChampions);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "physicalDamageDealtToChampions" + appendWord);
			emitval.set("" + player.physicalDamageDealtToChampions);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "trueDamageDealtToChampions" + appendWord);
			emitval.set("" + player.trueDamageDealtToChampions);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "totalMinionsKilled" + appendWord);
			emitval.set("" + player.totalMinionsKilled);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "champLevel" + appendWord);
			emitval.set("" + player.champLevel);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "champExperience" + appendWord);
			emitval.set("" + player.champExperience);
			context.write(emitkey, emitval);


			emitkey.set(keyStr + "teamDragonKills" + appendWord);
			emitval.set("" + team.teamDragonKills);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "teamBaronKills" + appendWord);
			emitval.set("" + team.teamBaronKills);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "teamRiftHeraldKills" + appendWord);
			emitval.set("" + team.teamRiftHeraldKills);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "teamChampionKills" + appendWord);
			emitval.set("" + team.teamChampionKills);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "timeCCingOthers" + appendWord);
			emitval.set("" + player.timeCCingOthers);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "damageDealtToBuildings" + appendWord);
			emitval.set("" + player.damageDealtToBuildings);
			context.write(emitkey, emitval);

		}

		//timeline data
		public static void splitData2(String keyStr, Player15min p15, Team15min t15, String appendWord, Context context) 
			throws IOException, InterruptedException{

			emitkey.set(keyStr + "goldEarned-15min" + appendWord);
			emitval.set("" + p15.goldEarned);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "kills-15min" + appendWord);
			emitval.set("" + p15.kills);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "deaths-15min"+ appendWord);
			emitval.set("" + p15.deaths);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "assists-15min" + appendWord);
			emitval.set("" + p15.assists);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "magicDamageDealtToChampions-15min" + appendWord);
			emitval.set("" + p15.magicDamageDealtToChampions);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "physicalDamageDealtToChampions-15min" + appendWord);
			emitval.set("" + p15.physicalDamageDealtToChampions);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "trueDamageDealtToChampions-15min" + appendWord);
			emitval.set("" + p15.trueDamageDealtToChampions);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "totalMinionsKilled-15min" + appendWord);
			emitval.set("" + p15.totalMinionsKilled);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "champLevel-15min" + appendWord);
			emitval.set("" + p15.champLevel);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "champExperience-15min" + appendWord);
			emitval.set("" + p15.champExperience);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "teamDragonKills-15min" + appendWord);
			emitval.set("" + t15.teamDragonKills);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "teamBaronKills-15min" + appendWord);
			emitval.set("" + t15.teamBaronKills);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "teamRiftHeraldKills-15min" + appendWord);
			emitval.set("" + t15.teamRiftHeraldKills);
			context.write(emitkey, emitval);

			emitkey.set(keyStr + "teamChampionKills-15min" + appendWord);
			emitval.set("" + t15.teamChampionKills);
			context.write(emitkey, emitval);

		}

	}


	/*
	 * Reduce class part
	 */


	public static class ReduceClass1 extends Reducer<Text, Text, Text, Text> {

		Text emitval = new Text();

		public void reduce(Text key, Iterable<Text> values, Context context) 
			throws IOException, InterruptedException
		{

			int sum = 0;
			for(Text val : values){
				sum += Integer.parseInt(val.toString());
			}
			emitval.set("" + sum);
			context.write(key, emitval);
			
                        // ------------------------------------------------------

		}

	      
	}

	public static class MapClass2 extends Mapper<Object, Text, Text, Text> {

		private Text emitkey = new Text ();
		private Text emitval = new Text ();

		public static String[] keyParse(String str) {
			String[] splitOne = str.split("_");
			String[] returnOne = new String[2];
	
			int len = splitOne[splitOne.length - 1].length();
			returnOne[0] = str.substring(0, str.length() - len - 1);
			returnOne[1] = str.substring(str.length() - len);
	
			return returnOne;
		}

		// Text : input line
		// --> format = <point id> \tab <dimension 1> \tab <dimension 2>
		public void map (Object key, Text value, Context context) throws IOException, InterruptedException{
			String [] splitValue = value.toString().split("\t");
			String [] parsedKey = keyParse(splitValue[0]);
			emitkey.set(parsedKey[0]);
			String valStr = parsedKey[1] + "_" + splitValue[1];
			emitval.set(valStr); 
			context.write(emitkey, emitval);
			
		}
	}

	public static class ReduceClass2 extends Reducer<Text, Text, Text, Text> {

		private Text emitkey = new Text();
		private Text emitval = new Text();

		public void reduce(Text key, Iterable<Text> values, Context context) throws IOException, InterruptedException {
			
			String valStr = "";
			for(Text val : values){
				valStr += val.toString() + " ";
			}
			emitval.set(valStr);
			context.write(key,emitval);


		}
	}


	public static void main(String[] args) throws IOException, InterruptedException, ClassNotFoundException {
		Configuration conf = new Configuration ();
    		String[] otherArgs = new GenericOptionsParser(conf, args).getRemainingArgs();
		if (otherArgs.length != 3) {
			System.out.println ("usage: <in> <out1> <out2>");
			System.exit(1);
		}
	
        FileSystem hdfs = FileSystem.get(conf);
        Path output1 = new Path(otherArgs[1]);
		Path output2 = new Path(otherArgs[2]);
		
        if (hdfs.exists(output1)){
            hdfs.delete(output1, true);
		}

		if (hdfs.exists(output2)){
            hdfs.delete(output2, true);
		}


		Job job = new Job (conf, "1st phase");
		job.setJarByClass(ProcessMatch2.class);
		job.setNumReduceTasks (10);
		job.setMapperClass(MapClass1.class);
		job.setReducerClass(ReduceClass1.class);
		job.setOutputKeyClass(Text.class);
		job.setOutputValueClass(Text.class);
		FileInputFormat.addInputPath(job, new Path(otherArgs[0]));
		FileOutputFormat.setOutputPath(job, output1);
		if (! job.waitForCompletion(true))
			System.exit (1);


		Job job2 = new Job (conf, "2nd phase");
		job2.setJarByClass(ProcessMatch2.class);
		job2.setNumReduceTasks (1);
		job2.setMapperClass(MapClass2.class);
		job2.setReducerClass(ReduceClass2.class);
		job2.setOutputKeyClass(Text.class);
		job2.setOutputValueClass(Text.class);
		FileInputFormat.addInputPath(job2, new Path(otherArgs[1]));
		FileOutputFormat.setOutputPath(job2, output2);
		if (! job2.waitForCompletion(true))
			System.exit (1);      

       
	}
}

