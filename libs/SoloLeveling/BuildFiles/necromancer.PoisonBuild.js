/**
 *    @filename   necromancer.PoisonBuild.js
 *	  @author	  isid0re
 *    @desc       poison necro build for after respecOne
 */

var finalBuild = {
	caster: true,
	skillstab: 17, //poison
	wantedskills: [92, 74], // poison nova, corpse explosion
	usefulskills: [66, 68, 91], //ampdamage, bone armor, lower resist
	precastSkills: [68], // Bone armor
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["strength", 48], ["vitality", 165], ["strength", 61], ["vitality", 252], ["strength", 156], ["vitality", "all"]
	],
	skills: [
		[73, 1], // Poison Dagger
		[67, 1], // Teeth
		[74, 1], // Corpse Explosion
		[83, 1], // Poison Explosion
		[92, 20, false], // Poison Nova
		[83, 20, false], // poison explosion
		[73, 20, false], // Poison Dagger
		[68, 1], // Bone Armor
		[75, 1], // Clay Golem
		[79, 1], // Golem Mastery
		[89, 1], // Summon Resist
		[66, 1], // Amplified Damage
		[72, 1], // Weaken
		[77, 1], // Terror
		[87, 1], // Decrepify
		[76, 1], // Iron Maiden
		[82, 1], // Life Tap
		[91, 20, false], // lower resist
		[74, 20, false], // corpse explosion
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"([type] == wand || [type] == sword && ([Quality] >= Magic || [flag] == runeword) || [type] == knife && [Quality] >= Magic) && [flag] != ethereal # [secondarymindamage] == 0 && [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//Helmet
		"[name] == shako && [quality] == unique && [flag] != ethereal # [DamageResist] == 10 # [tier] == 100000 + tierscore(item)", // harlequin's crest
		//belt
		"[name] == spiderwebsash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 100000 + tierscore(item)", //arach's
		//boots
		"[name] == battleboots && [quality] == unique && [flag] != ethereal # [itemmagicbonus] >= 50 # [tier] == 5000 + tierscore(item)", //war traveler
		"[name] == scarabshellboots && [quality] == unique # [strength]+[vitality] >= 20 # [tier] == 100000 + tierscore(item)", //sandstorm treks
		//armor
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [frw] >= 45 # [tier] == 100000", //Enigma
		//shield
		"([type] == shield && ([Quality] >= Magic || [flag] == runeword) || [type] == voodooheads) && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		//gloves
		"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [fcr] >= 20 # [tier] == 100000 + tierscore(item)",
		//ammy
		"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 30 # [tier] == 100000 + tierscore(item)", //maras
		//rings
		"[name] == ring && [quality] == unique # [maxhp] >= 40 && [magicdamagereduction] >= 12 # [tier] == 99000", // dwarfstar
		"[type] == ring && [quality] == unique # [itemmaxmanapercent] == 25 # [tier] == 100000", //soj
		//Charms
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [maxhp] >= 20 # [invoquantity] == 4 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [itemmagicbonus] >= 7 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [fhr] >= 5 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [poisonandboneskilltab] == 1 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		//Switch
		"[name] == crystalsword && [flag] == runeword # [plusskillbattleorders] >= 1 # [secondarytier] == 100000",
		"[name] == monarch && [flag] == runeword # [fcr] >= 25 && [maxmana] >= 89 # [secondarytier] == 110000", //spirit
		//merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",	//Fortitude
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000",	//Eth Andy's
	]
};
