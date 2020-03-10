import { Controller } from 'stimulus'
import { GridConfig } from 'shared/config_service'
import { Customers } from 'shared/api_service'
import I18n from 'shared/locale.js.erb'
import { LocalListening } from 'shared/local_listening'
import { ACCOUNT_TARGET, GRID_REFRESH } from 'shared/constant'
import { TrashAttr, CallAttr, SMSAttr } from 'shared/html_element_attr'

export default class extends Controller {
  static targets = ['total']
  static crmGrid
  connect() {
    this.setup()
    this.listening()
  }
  disconnect() {}
  initialize() {}

  listening() {
    LocalListening(ACCOUNT_TARGET, () => {
      let self
      this.refresh()
    })
  }

  private
  setup() {
    this.parentList.jsGrid(this.config)
  }

  refresh() {
    return this.parentList.jsGrid(GRID_REFRESH)
  }

  get parentList() {
    return $('#crm-list')
  }

  get config() {
    return {
      ...GridConfig,
      ...{
        height: '500px',
        controller: this.controller,
        fields: this.fields,
        onRefreshed: args => {
          this.onRefreshed(args)
        }
      }
    }
  }

  get controller() {
    return {
      loadData: this.loadData,
      insertItem: $.noop,
      updateItem: $.noop,
      deleteItem: $.noop
    }
  }

  loadData() {
    let deferred = $.Deferred()
    Customers().then(
      response => {
        deferred.resolve(response.data)
      }
    ).catch(
      error => {
        console.log(error)
      }
    )

    return deferred.promise()
  }

  get fields() {
    return [
      { name: 'id', title: '#', type: 'text', width: 20 },
      { name: 'username', title: 'Họ tên', type: 'text', width: 150, css: 'text-capitalize' },
      { name: 'phone_number', title: 'Số điện thoại', type: 'text', width: 50 },
      { type: 'control', width: 40, modeSwitchButton: true, editButton: false, itemTemplate: this.itemTemplate }
    ]
  }

  itemTemplate(value, item) {
    let $iconTrash = $('<i>').attr({ class: 'fas fa-trash-alt' })
    let $iconCall = $('<i>').attr({ class: 'fas fa-phone-alt mr-1' })
    let $iconSms = $('<i>').attr({ class: 'fas fa-sms mr-1' })
    let $customTrashButton = $('<a>')
      .attr(TrashAttr(Routes.crm_path(item.id)))
      .append($iconTrash)
    let $customCallButton = $('<a>')
      .attr(CallAttr(item.phone_number))
      .append($iconCall)
      .append(I18n.t('jsgrid.call'))
    let $customSmsButton = $('<a>')
      .attr(SMSAttr())
      .append($iconSms)
      .append(I18n.t('jsgrid.sms'))
    return $('<div>')
      .append($customCallButton)
      .append($customSmsButton)
      .append($customTrashButton)
  }

  onRefreshed(args) {
    this.totalTarget.innerHTML = I18n.t('crm.index', { total: args.grid.data.length })
  }
}