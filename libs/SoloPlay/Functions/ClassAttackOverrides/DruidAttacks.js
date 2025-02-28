/**
*  @filename    DruidAttacks.js
*  @author      theBGuy
*  @desc        Druid fixes to improve class attack functionality
*
*/

/**
 * @todo
 * Test traveling in wolf form/ utilizing wereform if we have it and need to perform normal attack
 */

includeIfNotIncluded("common/Attacks/Druid.js");

ClassAttack.doAttack = function (unit, preattack) {
	if (!unit) return Attack.Result.SUCCESS;
	let gid = unit.gid;

	if (Config.MercWatch && Town.needMerc()) {
		console.log("mercwatch");

		if (Town.visitTown()) {
			// lost reference to the mob we were attacking
			if (!unit || !copyUnit(unit).x || !Game.getMonster(-1, -1, gid) || unit.dead) {
				return Attack.Result.SUCCESS;
			}
		}
	}

	let checkSkill;
	let mercRevive = 0;
	let timedSkill = -1;
	let untimedSkill = -1;
	let gold = me.gold;
	let index = (unit.isSpecial || unit.isPlayer) ? 1 : 3;

	// Rebuff Hurricane
	Skill.canUse(sdk.skills.Hurricane) && !me.getState(sdk.states.Hurricane) && Skill.cast(sdk.skills.Hurricane, sdk.skills.hand.Right);
	// Rebuff Cyclone Armor
	Skill.canUse(sdk.skills.CycloneArmor) && !me.getState(sdk.states.CycloneArmor) && Skill.cast(sdk.skills.CycloneArmor, sdk.skills.hand.Right);

	if (index === 1 && !unit.dead && unit.curseable) {
		const commonCheck = (gold > 500000 || unit.isBoss || [sdk.areas.ChaosSanctuary, sdk.areas.ThroneofDestruction].includes(me.area));

		if (CharData.skillData.haveChargedSkill(sdk.skills.SlowMissiles) && unit.getEnchant(sdk.enchant.LightningEnchanted) && !unit.getState(sdk.states.SlowMissiles)
			&& (gold > 500000 && !unit.isBoss) && !checkCollision(me, unit, sdk.collision.Ranged)) {
			// Cast slow missiles
			Attack.castCharges(sdk.skills.SlowMissiles, unit);
		}

		if (CharData.skillData.haveChargedSkill(sdk.skills.InnerSight) && !unit.getState(sdk.states.InnerSight)
			&& gold > 500000 && !checkCollision(me, unit, sdk.collision.Ranged)) {
			// Cast slow missiles
			Attack.castCharges(sdk.skills.InnerSight, unit);
		}

		if (CharData.skillData.haveChargedSkillOnSwitch(sdk.skills.Decrepify)
			&& !unit.getState(sdk.states.Decrepify) && commonCheck && !checkCollision(me, unit, sdk.collision.Ranged)) {
			// Switch cast decrepify
			Attack.switchCastCharges(sdk.skills.Decrepify, unit);
		}
		
		if (CharData.skillData.haveChargedSkillOnSwitch(sdk.skills.Weaken)
			&& !unit.getState(sdk.states.Weaken) && !unit.getState(sdk.states.Decrepify) && commonCheck && !checkCollision(me, unit, sdk.collision.Ranged)) {
			// Switch cast weaken
			Attack.switchCastCharges(sdk.skills.Weaken, unit);
		}
	}

	// specials and dolls for now, should make dolls much less dangerous with the reduction of their damage
	if (Precast.haveCTA > -1 && !unit.dead && (index === 1 || unit.isDoll)
		&& unit.distance < 5 && !unit.getState(sdk.states.BattleCry) && unit.curseable) {
		Skill.switchCast(sdk.skills.BattleCry, {oSkill: true});
	}

	if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0])
		&& (!me.getState(sdk.states.SkillDelay) || !Skill.isTimed(Config.AttackSkill[0]))) {
		if (unit.distance > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, sdk.collision.Ranged)) {
			if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), sdk.collision.Ranged)) {
				return Attack.Result.FAILED;
			}
		}

		Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);

		return Attack.Result.SUCCESS;
	}

	// Get timed skill
	checkSkill = Attack.getCustomAttack(unit) ? Attack.getCustomAttack(unit)[0] : Config.AttackSkill[index];

	if (Attack.checkResist(unit, checkSkill) && Attack.validSpot(unit.x, unit.y, checkSkill)) {
		timedSkill = checkSkill;
	} else if (Config.AttackSkill[5] > -1 && Attack.checkResist(unit, Config.AttackSkill[5]) && Attack.validSpot(unit.x, unit.y, Config.AttackSkill[5])) {
		timedSkill = Config.AttackSkill[5];
	}

	// Get untimed skill
	checkSkill = Attack.getCustomAttack(unit) ? Attack.getCustomAttack(unit)[1] : Config.AttackSkill[index + 1];

	if (Attack.checkResist(unit, checkSkill) && Attack.validSpot(unit.x, unit.y, checkSkill)) {
		untimedSkill = checkSkill;
	} else if (Config.AttackSkill[6] > -1 && Attack.checkResist(unit, Config.AttackSkill[6]) && Attack.validSpot(unit.x, unit.y, Config.AttackSkill[6])) {
		untimedSkill = Config.AttackSkill[6];
	}

	// Low mana timed skill
	if (Config.LowManaSkill[0] > -1 && Skill.getManaCost(timedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[0])) {
		timedSkill = Config.LowManaSkill[0];
	}

	// Low mana untimed skill
	if (Config.LowManaSkill[1] > -1 && Skill.getManaCost(untimedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[1])) {
		untimedSkill = Config.LowManaSkill[1];
	}

	if (me.normal && me.charlvl > 12 && gold < 5000 && Skill.getManaCost(timedSkill) > me.mp) {
		switch (SetUp.currentBuild) {
		case "Start":
			if (Skill.canUse(sdk.skills.Firestorm) && Skill.getManaCost(sdk.skills.Firestorm) < me.mp) {
				timedSkill = sdk.skills.Firestorm;
			} else if (me.getMobCount(6, Coords_1.Collision.BLOCK_MISSILE | Coords_1.BlockBits.BlockWall) >= 1) {
				// I have no mana and there are mobs around me, just attack
				timedSkill = sdk.skills.Attack;
			}

			break;
		default:
			break;
		}
	}

	let result = this.doCast(unit, timedSkill, untimedSkill);

	if (result === Attack.Result.CANTATTACK && Attack.canTeleStomp(unit)) {
		let merc = me.getMerc();

		while (unit.attackable) {
			if (Misc.townCheck()) {
				if (!unit || !copyUnit(unit).x) {
					unit = Misc.poll(() => Game.getMonster(-1, -1, gid), 1000, 80);
				}
			}

			if (!unit) return Attack.Result.SUCCESS;

			if (Town.needMerc()) {
				if (Config.MercWatch && mercRevive++ < 1) {
					Town.visitTown();
				} else {
					return Attack.Result.CANTATTACK;
				}

				(merc === undefined || !merc) && (merc = me.getMerc());
			}

			if (!!merc && getDistance(merc, unit) > 5) {
				Pather.moveToUnit(unit);

				let spot = Attack.findSafeSpot(unit, 10, 5, 9);
				!!spot && Pather.walkTo(spot.x, spot.y);
			}

			let closeMob = Attack.getNearestMonster({skipGid: gid});
			!!closeMob && this.doCast(closeMob, timedSkill, untimedSkill);
		}

		return Attack.Result.SUCCESS;
	}

	return result;
};

ClassAttack.doCast = function (unit, timedSkill, untimedSkill) {
	let walk;

	// No valid skills can be found
	if (timedSkill < 0 && untimedSkill < 0) return Attack.Result.CANTATTACK;

	// Rebuff Hurricane
	Skill.canUse(sdk.skills.Hurricane) && !me.getState(sdk.states.Hurricane) && Skill.cast(sdk.skills.Hurricane, sdk.skills.hand.Right);

	if (timedSkill > -1 && (!me.getState(sdk.states.SkillDelay) || !Skill.isTimed(timedSkill))) {
		switch (timedSkill) {
		case sdk.skills.Tornado:
			if (Math.ceil(unit.distance) > (Skill.getRange(timedSkill)) || checkCollision(me, unit, sdk.collision.Ranged)) {
				if (!Attack.getIntoPosition(unit, (Skill.getRange(timedSkill)), sdk.collision.Ranged)) {
					return Attack.Result.FAILED;
				}
			}

			// Randomized x coord changes tornado path and prevents constant missing
			if (!unit.dead) {
				Skill.cast(timedSkill, Skill.getHand(timedSkill), unit.x + rand(-1, 1), unit.y);
			}

			return Attack.Result.SUCCESS;
		default:
			if (Skill.getRange(timedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) return Attack.Result.FAILED;

			if (Math.ceil(unit.distance) > (Skill.getRange(timedSkill)) || checkCollision(me, unit, sdk.collision.Ranged)) {
				// Allow short-distance walking for melee skills
				walk = Skill.getRange(timedSkill) < 4 && unit.distance < 10 && !checkCollision(me, unit, sdk.collision.BlockWall);

				if (!Attack.getIntoPosition(unit, (Skill.getRange(timedSkill)), sdk.collision.Ranged, walk)) {
					return Attack.Result.FAILED;
				}
			}

			!unit.dead && Skill.cast(timedSkill, Skill.getHand(timedSkill), unit);

			return Attack.Result.SUCCESS;
		}
	}

	if (untimedSkill > -1) {
		if (Skill.getRange(untimedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) return Attack.Result.FAILED;

		if (Math.ceil(unit.distance) > (Skill.getRange(untimedSkill)) || checkCollision(me, unit, sdk.collision.Ranged)) {
			// Allow short-distance walking for melee skills
			walk = Skill.getRange(untimedSkill) < 4 && unit.distance < 10 && !checkCollision(me, unit, sdk.collision.BlockWall);

			if (!Attack.getIntoPosition(unit, (Skill.getRange(untimedSkill)), sdk.collision.Ranged, walk)) {
				return Attack.Result.FAILED;
			}
		}

		!unit.dead && Skill.cast(untimedSkill, Skill.getHand(untimedSkill), unit);

		return Attack.Result.SUCCESS;
	}

	Misc.poll(() => !me.skillDelay, 1000, 40);

	return Attack.Result.SUCCESS;
};

