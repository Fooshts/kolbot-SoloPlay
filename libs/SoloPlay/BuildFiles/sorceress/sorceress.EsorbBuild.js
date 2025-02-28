/**
*  @filename    Sorceress.EsorbBuild.js
*  @author      theBGuy
*  @desc        Energy Shield + Frozen Orb based final build
*
*/

const finalBuild = {
	caster: true,
	skillstab: sdk.skills.tabs.Lightning,
	wantedskills: [sdk.skills.FrozenOrb, sdk.skills.ColdMastery],
	usefulskills: [sdk.skills.Telekinesis, sdk.skills.EnergyShield, sdk.skills.StaticField],
	precastSkills: [sdk.skills.FrozenArmor],
	mercDiff: sdk.difficulty.Nightmare,
	mercAct: 2,
	mercAuraWanted: "Holy Freeze",
	classicStats: [
		["dexterity", 51], ["strength", 80], ["energy", 100], ["vitality", 125],
		["energy", 150], ["vitality", 150], ["energy", "all"]
	],
	expansionStats: [
		["strength", 48], ["vitality", 165], ["strength", 61],
		["vitality", 252], ["strength", 127], ["dexterity", "block"], ["vitality", "all"]
	],
	skills: [
		[sdk.skills.Warmth, 1],
		[sdk.skills.FrozenArmor, 1],
		[sdk.skills.StaticField, 1],
		[sdk.skills.Teleport, 10],
		[sdk.skills.EnergyShield, 8],
		[sdk.skills.Telekinesis, 20],
		[sdk.skills.FrozenOrb, 20],
		[sdk.skills.ColdMastery, 17],
		[sdk.skills.EnergyShield, 10],
		[sdk.skills.StaticField, 20],
	],
	classicTiers: [
		// Weapon - Spectral Shard
		"[name] == blade && [quality] == unique # [fcr] == 20 && [allres] == 10 # [tier] == 100000",
		// Helm - Tarnhelm
		"[name] == skullcap && [quality] == unique # [itemallskills] == 1 && [itemmagicbonus] >= 25 # [tier] == 100000 + tierscore(item)",
		// Shield
		"[type] == shield && [quality] >= magic # [sorceressskills] == 2 && [allres] >= 16 # [tier] == 100000 + tierscore(item)",
		// Rings - SoJ
		"[type] == ring && [quality] == unique # [itemmaxmanapercent] == 25 # [tier] == 100000",
		// Amulet
		"[type] == amulet && [quality] >= magic # [sorceressskills] == 2 && [fcr] == 10 # [tier] == 100000 + tierscore(item)",
		// Boots
		"[type] == boots && [quality] >= magic # [frw] >= 20 && [fhr] == 10 && [coldresist]+[lightresist] >= 10 # [tier] == 100000 + tierscore(item)",
		// Belt
		"[type] == belt && [quality] >= magic # [fhr] >= 20 && [maxhp] >= 40 && [fireresist]+[lightresist] >= 20 # [tier] == 100000 + tierscore(item)",
		// Gloves - Magefist
		"[name] == lightgauntlets && [quality] == unique # [fcr] >= 20 && [addfireskills] == 1 # [tier] == 100000 + tierscore(item)",
	],
	expansionTiers: [
		// Weapon - Tals Orb
		"[name] == swirlingcrystal && [quality] == set && [flag] != ethereal # [skilllightningmastery]+[skillfiremastery]+[skillcoldmastery] >= 3 # [tier] == 100000 + tierscore(item)",
		// Helmet - Tals Mask
		"[name] == deathmask && [quality] == set && [flag] != ethereal # [coldresist]+[lightresist]+[fireresist]+[poisonresist] >= 60 # [tier] == 100000 + tierscore(item)",
		// Belt - Tals Belt
		"[name] == meshbelt && [quality] == set && [flag] != ethereal # [itemmagicbonus] >= 10 # [tier] == 100000 + tierscore(item)",
		// Final Boots - Sandstorm Treks
		"[name] == scarabshellboots && [quality] == unique # [strength]+[vitality] >= 20 # [tier] == 100000 + tierscore(item)",
		// Boots - War Traveler
		"[name] == battleboots && [quality] == unique && [flag] != ethereal # [itemmagicbonus] >= 50 # [tier] == 5000 + tierscore(item)",
		// Armor - Tals Armor
		"[name] == lacqueredplate && [quality] == set # [coldresist] >= 1 # [tier] == 100000",
		// Final Shield - Sanctuary
		"[name] == hyperion && [flag] == runeword # [fhr] >= 20 && [enhanceddefense] >= 130 && [fireresist] >= 50 # [tier] == 100000",
		// Shield - Mosers
		"[name] == roundshield && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 180 # [tier] == 50000 + tierscore(item)",
		// Final Gloves - Perfect Upp'ed Magefist
		"[name] == battlegauntlets && [quality] == unique && [flag] != ethereal # [enhanceddefense] == 30 && [addfireskills] == 1 # [tier] == 110000",
		// Gloves - Upp'ed Magefist
		"[name] == battlegauntlets && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 20 && [addfireskills] == 1 # [tier] == 100000 + tierscore(item)",
		// Gloves - Magefist
		"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 20 && [addfireskills] == 1 # [tier] == 100000 + tierscore(item)",
		// Amulet - Tals Ammy
		"[name] == amulet && [quality] == set # [lightresist] == 33 # [tier] == 100000",
		// Final Rings - Perfect Raven Frost & Nagelring
		"[type] == ring && [quality] == unique # [dexterity] == 20 # [tier] == 100000",
		"[type] == ring && [quality] == unique # [itemmagicbonus] == 30 # [tier] == 100000",
		// Rings - Raven Frost
		"[type] == ring && [quality] == unique # [dexterity] >= 15 # [tier] == 90000",
		// Switch - CTA
		"[minimumsockets] >= 5 && [flag] == runeword # [plusskillbattleorders] >= 1 # [secondarytier] == 100000",
		// Switch Shield - 1+ all skill
		"[type] == shield # [itemallskills] >= 1 # [secondarytier] == 100000 + tierscore(item)",
		// Merc Armor - Fortitude
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",
		// Merc Final Helmet - Eth Andy's
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000 + mercscore(item)",
		// Merc Helmet - Andy's
		"[name] == demonhead && [quality] == unique && [flag] != ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 40000 + mercscore(item)",
	],
	stats: undefined,
	autoEquipTiers: undefined,

	charms: {
		ResLife: {
			max: 3,
			have: [],
			classid: sdk.items.SmallCharm,
			stats: function (check) {
				return (!check.unique && check.classid === this.classid && check.allRes === 5 && check.getStat(sdk.stats.MaxHp) === 20);
			}
		},

		ResMf: {
			max: 2,
			have: [],
			classid: sdk.items.SmallCharm,
			stats: function (check) {
				return (!check.unique && check.classid === this.classid && check.allRes === 5 && check.getStat(sdk.stats.MagicBonus) === 7);
			}
		},

		ResFHR: {
			max: 3,
			have: [],
			classid: sdk.items.SmallCharm,
			stats: function (check) {
				return (!check.unique && check.classid === this.classid && check.allRes === 5 && check.getStat(sdk.stats.FHR) === 5);
			}
		},

		SkillerLight: {
			max: 1,
			have: [],
			classid: sdk.items.GrandCharm,
			stats: function (check) {
				return (!check.unique && check.classid === this.classid && check.getStat(sdk.stats.AddSkillTab, sdk.skills.tabs.Lightning) === 1
					&& check.getStat(sdk.stats.MaxHp) >= 40);
			}
		},

		SkillerCold: {
			max: 1,
			have: [],
			classid: sdk.items.GrandCharm,
			stats: function (check) {
				return (!check.unique && check.classid === this.classid && check.getStat(sdk.stats.AddSkillTab, sdk.skills.tabs.Cold) === 1
					&& check.getStat(sdk.stats.MaxHp) >= 40);
			}
		},
	},
	
	AutoBuildTemplate: {
		1:	{
			Update: function () {
				Config.AttackSkill = [-1, sdk.skills.FrozenOrb, sdk.skills.StaticField, sdk.skills.FrozenOrb, sdk.skills.StaticField, -1, -1];
				Config.LowManaSkill = [-1, -1];
				Config.SkipImmune = ["cold"];
				Config.HPBuffer = me.expansion ? 1 : 5;
				Config.MPBuffer = me.expansion ? 1 : 5;
			}
		},
	},

	respec: function () {
		if (me.classic) {
			return me.charlvl >= 75 && me.diablo;
		} else {
			return me.haveAll([
				{ name: sdk.locale.items.TalRashasBelt, quality: sdk.items.quality.Set },
				{ name: sdk.locale.items.TalRashasAmulet, quality: sdk.items.quality.Set },
				{ name: sdk.locale.items.TalRashasArmor, quality: sdk.items.quality.Set },
				{ name: sdk.locale.items.TalRashasOrb, quality: sdk.items.quality.Set },
				{ name: sdk.locale.items.TalRashasHelmet, quality: sdk.items.quality.Set },
			]) && me.hell && me.baal;
		}
	},

	active: function () {
		return this.respec() && me.getSkill(sdk.skills.Telekinesis, sdk.skills.subindex.HardPoints) === 20;
	},
};

// Has to be set after its loaded
finalBuild.stats = me.classic ? finalBuild.classicStats : finalBuild.expansionStats;
finalBuild.autoEquipTiers = me.classic ? finalBuild.classicTiers : finalBuild.expansionTiers;
