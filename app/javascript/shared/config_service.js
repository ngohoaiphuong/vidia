import I18n from 'shared/locale.js.erb'

const GridConfig = {
    fields: [],
    data: [],
 
    autoload: true,
    controller: {
      loadData: $.noop,
      insertItem: $.noop,
      updateItem: $.noop,
      deleteItem: $.noop
    },
 
    width: '100%',
    height: 'auto',
 
    heading: true,
    filtering: true,
    inserting: false,
    editing: true,
    selecting: true,
    sorting: true,
    paging: true,
    pageLoading: false,
 
    rowClass: $.noop,
    rowClick: $.noop,
    rowDoubleClick: $.noop,
    onRefreshed: $.noop,
 
    noDataContent: I18n.t('jsgrid.no_data_content'),
 
    confirmDeleting: true,
    deleteConfirm: "Are you sure?",
 
    pagerContainer: null,
    pageIndex: 1,
    pageSize: 20,
    pageButtonCount: 15,
    pagerFormat: 'Pages: {first} {prev} {pages} {next} {last}    {pageIndex} / {pageCount}',
    pagePrevText: I18n.t('jsgrid.prev'),
    pageNextText: I18n.t('jsgrid.next'),
    pageFirstText: I18n.t('jsgrid.first'),
    pageLastText: I18n.t('jsgrid.last'),
    pageNavigatorNextText: "...",
    pageNavigatorPrevText: "...",
 
    invalidNotify: $.noop,
    invalidMessage: "Invalid data entered!",
 
    loadIndication: true,
    loadIndicationDelay: 500,
    loadMessage: I18n.t('jsgrid.load_message'),
    loadShading: true,
 
    updateOnResize: true,
 
    rowRenderer: null,
    headerRowRenderer: null,
    filterRowRenderer: null,
    insertRowRenderer: null,
    editRowRenderer: null
}

export {
  GridConfig
}