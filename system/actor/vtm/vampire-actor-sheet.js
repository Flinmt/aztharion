// Preparation functions
import {
  prepareBiographyContext,
  prepareExperienceContext,
  prepareFeaturesContext,
  prepareEquipmentContext,
  prepareNotepadContext,
  prepareSettingsContext,
  prepareStatsContext,
  prepareLimitedContext
} from '../scripts/prepare-partials.js'
import { prepareDisciplinesContext, prepareBloodContext } from './scripts/prepare-partials.js'
// Various button functions
import {
  _onAddDiscipline,
  _onDisciplineToChat,
  _onRemoveDiscipline,
  _onSelectDiscipline,
  _onSelectDisciplinePower
} from './scripts/disciplines.js'
import { _onFrenzyRoll } from './scripts/frenzy-roll.js'
import { _onEndFrenzy } from './scripts/end-frenzy.js'
import { _onRemorseRoll } from './scripts/roll-remorse.js'
// Base actor sheet to extend from
import { WoDActorBase } from '../wod-actor-base.js'
// Mixin
const { HandlebarsApplicationMixin } = foundry.applications.api

/**
 * Extend the WoDActorBase document
 * @extends {WoDActorBase}
 */
export class VampireActorSheet extends HandlebarsApplicationMixin(WoDActorBase) {
  static DEFAULT_OPTIONS = {
    classes: ['aztharion', 'actor', 'sheet', 'vampire'],
    actions: {
      addDiscipline: _onAddDiscipline,
      removeDiscipline: _onRemoveDiscipline,
      disciplineChat: _onDisciplineToChat,
      selectDiscipline: _onSelectDiscipline,
      selectDisciplinePower: _onSelectDisciplinePower,
      resistFrenzy: _onFrenzyRoll,
      endFrenzy: _onEndFrenzy,
      remorseRoll: _onRemorseRoll
    }
  }

  static PARTS = {
    header: {
      template: 'systems/aztharion/display/vtm/actors/vampire-sheet.hbs'
    },
    tabs: {
      template: 'systems/aztharion/display/shared/actors/parts/tab-navigation.hbs'
    },
    stats: {
      template: 'systems/aztharion/display/shared/actors/parts/stats.hbs'
    },
    experience: {
      template: 'systems/aztharion/display/shared/actors/parts/experience.hbs'
    },
    disciplines: {
      template: 'systems/aztharion/display/vtm/actors/parts/disciplines.hbs'
    },

    features: {
      template: 'systems/aztharion/display/shared/actors/parts/features.hbs'
    },
    equipment: {
      template: 'systems/aztharion/display/shared/actors/parts/equipment.hbs'
    },
    biography: {
      template: 'systems/aztharion/display/shared/actors/parts/biography.hbs'
    },
    notepad: {
      template: 'systems/aztharion/display/shared/actors/parts/notepad.hbs'
    },
    settings: {
      template: 'systems/aztharion/display/shared/actors/parts/actor-settings.hbs'
    },
    banner: {
      template: 'systems/aztharion/display/shared/actors/parts/type-banner.hbs'
    },
    limited: {
      template: 'systems/aztharion/display/shared/actors/limited-sheet.hbs'
    }
  }

  tabs = {
    stats: {
      id: 'stats',
      group: 'primary',
      title: 'AZTHARION.Tabs.Stats',
      icon: '<i class="fa-regular fa-chart-line"></i>'
    },
    experience: {
      id: 'experience',
      group: 'primary',
      title: 'AZTHARION.Tabs.Experience',
      icon: '<i class="fa-solid fa-file-contract"></i>'
    },
    disciplines: {
      id: 'disciplines',
      group: 'primary',
      title: 'AZTHARION.VTM.Disciplines',
      icon: '<span class="aztharion-symbol">b</span>'
    },

    features: {
      id: 'features',
      group: 'primary',
      title: 'AZTHARION.Tabs.Features',
      icon: '<i class="fas fa-gem"></i>'
    },
    equipment: {
      id: 'equipment',
      group: 'primary',
      title: 'AZTHARION.Tabs.Equipment',
      icon: '<i class="fa-solid fa-toolbox"></i>'
    },
    biography: {
      id: 'biography',
      group: 'primary',
      title: 'AZTHARION.Tabs.Biography',
      icon: '<i class="fas fa-id-card"></i>'
    },
    notepad: {
      id: 'notepad',
      group: 'primary',
      title: 'AZTHARION.Tabs.Notes',
      icon: '<i class="fas fa-sticky-note"></i>'
    },
    settings: {
      id: 'settings',
      group: 'primary',
      title: 'AZTHARION.Tabs.Settings',
      icon: '<i class="fa-solid fa-gears"></i>'
    }
  }

  async _prepareContext() {
    // Top-level variables
    const data = await super._prepareContext()
    const actor = this.actor
    const actorData = actor.system

    // Filters for item-specific data
    const clanFilter = actor.items.filter((item) => item.type === 'clan')

    // Prepare vampire-specific items
    data.domitor = actorData.headers.domitor
    data.humanity = actorData.humanity
    data.hunger = actorData.hunger
    data.clan = clanFilter[0]
    data.frenzyActive = actorData.frenzyActive

    return data
  }

  async _preparePartContext(partId, context, options) {
    // Inherit any preparation from the extended class
    context = { ...(await super._preparePartContext(partId, context, options)) }

    // Top-level variables
    const actor = this.actor

    // Prepare each page context
    switch (partId) {
      // Stats
      case 'stats':
        return prepareStatsContext(context, actor)

      // Experience
      case 'experience':
        return prepareExperienceContext(context, actor)

      // Disciplines
      case 'disciplines':
        return prepareDisciplinesContext(context, actor)



      // Features
      case 'features':
        return prepareFeaturesContext(context, actor)

      // Equipment
      case 'equipment':
        return prepareEquipmentContext(context, actor)

      // Biography
      case 'biography':
        return prepareBiographyContext(context, actor)

      // Notepad
      case 'notepad':
        return prepareNotepadContext(context, actor)

      // Settings
      case 'settings':
        return prepareSettingsContext(context, actor)

      // Limited view
      case 'limited':
        return prepareLimitedContext(context, actor)
    }

    return context
  }
}
