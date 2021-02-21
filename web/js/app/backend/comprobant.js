/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage comprobant
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */

Ext.ux.grid.GroupSummary.Calculations['total'] = function(v, record, field){
    var rate = 1;
    if(record.data.currencyobj)
        rate = record.data.currencyobj.get('rate');
    return  v + (record.data.credit/rate - record.data.debit/rate);
};
Ext.ux.grid.GroupSummary.Calculations['creditrate'] = function(v, record, field){
    var rate = 1;
    if(record.data.currencyobj)
        rate = record.data.currencyobj.get('rate');
    return v + record.data.credit/rate;
};
Ext.ux.grid.GroupSummary.Calculations['debitrate'] = function(v, record, field){
    var rate = 1;
    if(record.data.currencyobj)
        rate = record.data.currencyobj.get('rate');
    return v + record.data.debit/rate;
};
Ext.ux.grid.GroupSummary.Calculations['creditave'] = function(v, record, field){
    var rate = 1;
    if(record.data.currencyobj)
        rate = record.data.currencyobj.get('rate');
    return v + record.data.creditave/rate;
};
var summary = new Ext.ux.grid.GroupSummary();


ComprobantApp = function() {
    return {
        init : function(ComprobantApp) {
            
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/comprobant/request/method/load',
                baseParams:{
                    component: 'grid',                    
                    entityid: config.app_entityid,
                    start: 0,
                    limit: config.app_elementsongrid
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: function(store, records, options) {
                        for (var i=0; i<records.length; i++){
                            var obj = window['ComprobantApp'].decodeDetails(records[i].get('Transactions'));
                            records[i].set('details', obj);
                        }
                        
                        if (config.app_showmessageonstoreloadsuccessful)
                            loadStoreSuccessful();
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : function(){}
                }
            });
            
            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/comprobant/request/method/load',
                baseParams:{
                    entityid: config.app_entityid,
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });
            
            this.selectedTransactionsComboStore = new Ext.data.GroupingStore({
                url: config.app_host + '/comprobant/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                groupField: 'costcenter'
            });
            
            this.filters = new Ext.ux.grid.GridFilters({
                encode: true,
                local: false,
                menuFilterText: bundle.getMsg('app.languaje.find.label'),
                filters: [{
                    type: 'date',
                    dataIndex: 'creationdate',
                    beforeText: bundle.getMsg('app.languaje.find.beforethan'),
                    afterText: bundle.getMsg('app.languaje.find.afterthan'),
                    onText: bundle.getMsg('app.languaje.find.ondate'),
                    dateFormat: Date.patterns.NonISO8601Short
                },{
                    type: 'string',
                    dataIndex: 'comment'
                }]
            });
            
            this.expander = new Ext.ux.grid.RowExpander({
                enableCaching : false,
                tpl : new Ext.Template('\
                    <div style="width:100%;" class="x-grid3-row x-grid3-row-alt x-grid3-row-collapsed x-grid3-row-last">\
                       <table border="0" cellspacing="0" cellpadding="0" style="width:100%;" class="x-grid3-row-table">\
                          <tbody>\
                             {details}\
                          </tbody>\
                       </table>\
                    </div>')
            });
            
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelComprobant',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('page_copy'),
                title: config.app_showgridtitle ? bundle.getMsg("comprobant.grid.title") : '',
                autoExpandColumn: 'comprobantcolname',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function(button, eventObject) {
                        App.printView(window['ComprobantApp'].gridPanel);
                    }
                },{
                    id:'help',
                    qtip: bundle.getMsg('app.layout.help'),
                    handler: function(button, eventObject) {
                        window.open('../uploads/docs/usermanual.pdf#page=29&zoom=auto,26,252');
                    }
                }],
            
                listeners: {
                    activate: function(gridpanel){
                        gridpanel.getStore().baseParams.entityid = config.app_entityid;
                        
                        window['ComprobantApp'].gridPanel.filtersBtn.menu.items.items[3].fireEvent('click', window['ComprobantApp'].gridPanel.filtersBtn.menu.items.items[3]);
                        window['ComprobantApp'].gridPanel.filtersBtn.menu.items.items[3].setChecked(true, true);
                    },
                    rowclick : function(grid, rowIndex, eventObject) {
                        var selectionModel = grid.getSelectionModel();
                        
                        var obj = App.selectionChange(selectionModel);
                        
                        if(obj)                        
                            selectionModel.grid.updateBtn.setDisabled(!obj.deleteable);
                        
                        selectionModel.grid.reportBtn.setDisabled(selectionModel.getCount() != 1);
                    },
                    rowdblclick : function(grid, rowIndex, eventObject) {
                        if(grid.updateBtn && !grid.updateBtn.disabled && !grid.updateBtn.hidden)
                            grid.updateBtn.fireEvent('click', grid.updateBtn);
                    }
                },
                
                columns: [this.expander,{
                    xtype: 'datecolumn', 
                    format: Date.patterns.FullDateTime, 
                    header: bundle.getMsg('comprobant.field.creationdate'), 
                    width: 80, 
                    dataIndex: 'creationdate'
                },{
                    id:'comprobantcolname', 
                    header: bundle.getMsg('comprobant.field.comment'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'comment'
                },{
                    header: bundle.getMsg('comprobant.field.transactions'),
                    width: 25, 
                    sortable: true, 
                    dataIndex: 'Transactions',
                    renderer: function(v){
                        return v.length;
                    }
                }],
                
                view: new Ext.grid.GroupingView({
                    markDirty: false,
                    forceFit:true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? bundle.getMsg("app.form.elements") : bundle.getMsg("app.form.element")]})'
                }),
                
                plugins: [this.expander, this.filters],
                
                stripeRows: true,			
                tbar: [{
                    text: bundle.getMsg('app.form.add'),
                    iconCls: Ext.ux.Icon('add'),
                    ref: '../addBtn',
                    listeners: {
                        click: function(button, eventObject) {
                            window['ComprobantApp'].gridPanel.getSelectionModel().clearSelections();
                            window['ComprobantApp'].gridPanel.updateBtn.fireEvent('click', button);
                        }
                    }
                },{
                    ref: '../updateBtn',
                    text: bundle.getMsg('app.form.info'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('information'),
                    listeners: {
                        click: function(button, eventObject) {
                            App.mask.show();
                            var record = window['ComprobantApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){
                                record.set('creationtime', record.get('creationdate').format('H:i'));                                    
                                window['ComprobantApp'].formPanel.getForm().loadRecord(record);
                                
                                var transactions = record.get('Transactions');
                                
                                for (var i=0; transactions && i<transactions.length; i++){
                                    
                                    var nodeobj = new Ext.data.Record({
                                        id : transactions[i].Account.id
                                    });
                                    nodeobj.id = transactions[i].Account.id;
                                    
                                    if(transactions[i].Um){
                                        var umobj = new Ext.data.Record({
                                            id:transactions[i].Um.id
                                        });
                                        umobj.id = transactions[i].Um.id;
                                    }
                                        
                                    var currencyobj = new Ext.data.Record({
                                        id:transactions[i].Currency.id,
                                        rate:transactions[i].rate != '' ? transactions[i].rate : 1
                                    });
                                    currencyobj.id = transactions[i].currencyid;
                                            
                                    window['ComprobantApp'].selectedTransactionsComboStore.insert(window['ComprobantApp'].selectedTransactionsComboStore.getCount(), new Ext.data.Record({
                                        nodeobj: nodeobj,
                                        
                                        umobj: umobj,
                                        um: transactions[i].umstr && transactions[i].umstr != '' ? transactions[i].umstr : '',
                                        
                                        currencyobj: currencyobj,
                                        currency: transactions[i].Currency && transactions[i].Currency.code != '' ? transactions[i].Currency.code : '',
                                        
                                        amount: transactions[i].amount,
                                        account: transactions[i].Account && transactions[i].Account.manualcode ? transactions[i].Account.code + ' ' + transactions[i].Account.name  : transactions[i].Account.name,
                                        costcenter: transactions[i].Account && transactions[i].Account.Costcenter ? transactions[i].Account.Costcenter.name : '',
                                        
                                        debit: transactions[i].debit,
                                        credit: transactions[i].credit,
                                            
                                        creditave: transactions[i].creditave
                                    }));
                                }
                            }
                            else
                                window['ComprobantApp'].formPanel.getForm().reset();
                            window['ComprobantApp'].showWindow(button.getEl());
                            App.mask.hide();
                        }
                    }
                },{
                    ref: '../removeBtn',
                    text: bundle.getMsg('app.form.delete'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('delete'),
                    listeners: {
                        click: function(button, eventObject) {
                            window['ComprobantApp'].gridPanel.getBottomToolbar().deleteRowBtn.fireEvent('click');
                        }
                    }
                },'->',{
                    ref: '../reportBtn',
                    text: bundle.getMsg('app.languaje.report.label'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('report'),
                    listeners: {
                        click: function(button, eventObject) {
                            var record = window['ComprobantApp'].gridPanel.getSelectionModel().getSelected();
                            var url = '/comprobant/report/id/'+record.get('id')+'/entityid/'+config.app_entityid;
                            App.printView(url, ' ', ' '); 
                        }
                    }
                },'-', {
                    text: bundle.getMsg('app.form.applyfilters'),
                    iconCls: Ext.ux.Icon('table_gear'),
                    ref: '../filtersBtn',
                    menu : {
                        items: [{
                            text: bundle.getMsg('comprobant.filter.all'),
                            checked: true,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    window['ComprobantApp'].gridPanel.filters.clearFilters();    
                                }
                            }
                        },'-','<b class="menu-title">En el tiempo</b>',{
                            text: bundle.getMsg('comprobant.filter.day'),
                            checked: false,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    window['ComprobantApp'].gridPanel.filters.clearFilters();
                                    
                                    var date = new Date();
                                        
                                    window['ComprobantApp'].startdate = date;
                                    
                                    window['ComprobantApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                        'on': window['ComprobantApp'].startdate
                                    });
                                    window['ComprobantApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                            
                                    window['ComprobantApp'].gridPanel.filters.reload();
                                }
                            }
                        },{
                            text: bundle.getMsg('comprobant.filter.month'),
                            checked: false,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    window['ComprobantApp'].gridPanel.filters.clearFilters();
                                    
                                    var date = new Date();
                                        
                                    window['ComprobantApp'].startdate = date.getFirstDateOfMonth().add(Date.DAY, -1);
                                    window['ComprobantApp'].enddate = date.getLastDateOfMonth().add(Date.DAY, 1);
                                    
                                    window['ComprobantApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                        'after': window['ComprobantApp'].startdate,
                                        'before': window['ComprobantApp'].enddate
                                    });
                                    window['ComprobantApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                            
                                    window['ComprobantApp'].gridPanel.filters.reload();
                                }
                            }
                        },{
                            text: bundle.getMsg('comprobant.filter.year'),
                            checked: false,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    window['ComprobantApp'].gridPanel.filters.clearFilters();
                                                                        
                                    var date = new Date();
                                        
                                    window['ComprobantApp'].startdate = Date.parseDate(date.format('Y')+'-01-01', 'Y-m-d').add(Date.DAY, -1);
                                    window['ComprobantApp'].enddate = Date.parseDate(date.format('Y')+'-12-31', 'Y-m-d').add(Date.DAY, 1);
                                    
                                    window['ComprobantApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                        'after': window['ComprobantApp'].startdate,
                                        'before': window['ComprobantApp'].enddate
                                    });
                                    window['ComprobantApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                            
                                    window['ComprobantApp'].gridPanel.filters.reload();
                                }
                            }
                        }]
                    }
                },'-',{
                    ref: '../expandBtn',
                    iconCls: Ext.ux.Icon('expand-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.expandall'),
                    listeners: {
                        click: function(store, records, options) {
                            for (var i = 0; i < window['ComprobantApp'].gridPanel.getStore().getCount(); i++) {
                                window['ComprobantApp'].expander.expandRow(i);
                            }
                        }
                    }
                },{
                    ref: '../collapseBtn',
                    iconCls: Ext.ux.Icon('collapse-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.collapseall'),
                    listeners: {
                        click: function(store, records, options) {
                            for (var i = 0; i < window['ComprobantApp'].gridPanel.getStore().getCount(); i++) {
                                window['ComprobantApp'].expander.collapseRow(i);
                            }
                        }
                    }
                }],
                
                bbar: new Ext.PagingToolbar({
                    pageSize: parseInt(config.app_elementsongrid),
                    store: this.store,
                    plugins: new Ext.ux.ProgressBarPager(),
                    items: [{
                        tooltip: bundle.getMsg('app.form.deleterow'),
                        ref: 'deleteRowBtn', 
                        hidden: true,
                        disabled: true,
                        iconCls: Ext.ux.Icon('table_row_delete'),
                        listeners: {
                            click: function(button, eventObject) {
                                Ext.Msg.show({
                                    title: bundle.getMsg('app.msg.warning.title'),
                                    msg: bundle.getMsg('app.msg.warning.deleteselected.text'),
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(btn, text){
                                        if (btn == 'yes'){											
                                            var records = window['ComprobantApp'].gridPanel.getSelectionModel().getSelections();
                                            
                                            var array = new Array();                                
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
                                                
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/comprobant/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success)                         
                                                        window['ComprobantApp'].store.load({
                                                            params:{
                                                                start: window['ComprobantApp'].gridPanel.getBottomToolbar().cursor
                                                            }
                                                        }); 
                                                    else
                                                        requestFailed(response, false);
                                                    
                                                }
                                            });
                                        }
                                    },
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION
                                });
                            }
                        }
                    },{
                        tooltip: bundle.getMsg('app.form.clearfilters'),
                        iconCls: Ext.ux.Icon('table_lightning'),
                        handler: function () {
                            window['ComprobantApp'].gridPanel.filters.clearFilters();
                        } 
                    }],
                    displayInfo: true,
                    displayMsg: bundle.getMsg('app.form.bbar.displaymsg'),
                    emptyMsg: bundle.getMsg('app.form.bbar.emptymsg')
                }),
                
                sm: new Ext.grid.RowSelectionModel({
                    listeners: {
                        selectionchange: App.selectionChange
                    }
                })
            });
            
            this.gridPanel.getView().getRowClass = function(record, index, rowParams, store) {
                var cls = '';
                if (!record.get('deleteable')) 
                    cls += ' row-italic';
                
                return cls;
            };
            
            var nowdate = new Date();
            
            this.formPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/comprobant/request/method/save',
                frame:true,
                bodyStyle:'padding:5px 5px 0',						        
                keys: [formKeyMaping],
                items: [{
                    layout:'column',
                    items:[{
                        columnWidth:.15,
                        layout: 'form',
                        items: [{
                            fieldLabel: bundle.getMsg('app.form.date')+'<span style="color:red;"><sup>*</sup></span>', 
                            xtype:'datefield',
                            id:'comprobanttransactiondate',
                            name:'creationdate',
                            value: nowdate,
                            maxValue: nowdate,
                            allowBlank: false,
                            anchor:'-20',
                            listeners: {
                                blur: function() {
                                    window['ComprobantApp'].checkClosure(Ext.getCmp('comprobanttransactiondate'));
                                }
                            }
                        }]
                    },{
                        columnWidth:.15,
                        layout: 'form',
                        items: [new Ext.form.TimeField({
                            name:'creationtime',                                
                            fieldLabel: bundle.getMsg('app.form.time'), 
                            value: nowdate.format('H:i'),                            
                            anchor:'-20'
                        })]
                    },{
                        columnWidth:.7,
                        layout: 'form',
                        items: [{
                            xtype:'textfield',
                            name: 'comment',
                            fieldLabel: bundle.getMsg('um.field.comment'), 
                            anchor:'-20'
                        }]
                    }]
                }, new Ext.grid.GridPanel({
                    stripeRows: true,
                    id: 'gpComprobantTransactions',
                    autoExpandColumn: 'comprobanttransactionmaincolumn',	
                    store: this.selectedTransactionsComboStore,
                    anchor:'-20',
                    height: 300,
                    frame: true,
                    sm: new Ext.grid.RowSelectionModel({
                        listeners: {
                            selectionchange: function(selectionModel) {
                                Ext.getCmp('btnRemoveComprobantTransaction').setDisabled(selectionModel.getCount() < 1);
                            }
                        }
                    }),	
                    
                    view: new Ext.grid.GroupingView({
                        markDirty: false,
                        forceFit:true,
                        groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? bundle.getMsg("app.form.elements") : bundle.getMsg("app.form.element")]})'
                    }),
                    
                    plugins: [summary],
                    
                    columns: [{
                        hidden: true, 
                        header: bundle.getMsg('costcenter.field.label'),
                        width: 70, 
                        sortable: true, 
                        dataIndex: 'costcenter'
                    },{
                        id:'comprobanttransactionmaincolumn', 
                        header: bundle.getMsg('account.field.label'),
                        width: 150, 
                        sortable: true, 
                        dataIndex: 'account', 
                        summaryType: 'total',
                        summaryRenderer: function(v, params, data){
                            if (v < 0) {
                                v = parseFloat(-1*v).toFixed(2);
                                return '<b>'+bundle.getMsg('transaction.field.label')+': <span style="color:red;">$' + v + '</span></b>';
                            }
                            
                            v = parseFloat(v).toFixed(2);
                            return '<b>'+bundle.getMsg('transaction.field.label')+': <span style="color:green;">$' + v + '</span></b>';
                        }
                    },{
                        header: bundle.getMsg('app.form.amount'),
                        width: 40, 
                        sortable: true, 
                        dataIndex: 'amount'
                    },{
                        header: bundle.getMsg('um.field.label'),
                        width: 60, 
                        sortable: true, 
                        dataIndex: 'um'
                    },{
                        header: bundle.getMsg('transaction.field.debit'),
                        width: 40, 
                        sortable: true, 
                        renderer: 'usMoney',
                        dataIndex: 'debit',
                        summaryType: 'debitrate',
                        summaryRenderer: function(v, params, data){
                            v = parseFloat(v).toFixed(2);
                            return '$<b>' + v + '</b>';
                        }
                    },{
                        header: bundle.getMsg('transaction.field.credit'),
                        width: 40, 
                        sortable: true, 
                        renderer: 'usMoney',
                        dataIndex: 'credit',
                        summaryType: 'creditrate',
                        summaryRenderer: function(v, params, data){
                            v = parseFloat(v).toFixed(2);
                            return '$<b>' + v + '</b>';
                        }
                    },{
                        header: bundle.getMsg('comprobant.field.creditave'),                        
                        width: 40, 
                        sortable: true, 
                        hidden: true, 
                        renderer: 'usMoney',
                        dataIndex: 'creditave',
                        summaryType: 'creditave',
                        summaryRenderer: function(v, params, data){
                            v = parseFloat(v).toFixed(2);
                            return '$<b>' + v + '</b>';
                        }
                    },{
                        header: bundle.getMsg('currency.field.label'),
                        width: 30, 
                        sortable: true, 
                        dataIndex: 'currency', 
                        summaryType: 'total',
                        summaryRenderer: function(v, params, data){
                            return '<b>'+config.app_currencycode+'</b>';
                        }
                    }],
                    tbar: [{
                        xtype: 'displayfield', 
                        value: '&nbsp;'
                    },{
                        xtype: 'radiogroup',
                        id: 'comprobanttransactionisdebt',
                        width: 110, 
                        labelSeparator: '',
                        items: [{
                            boxLabel: bundle.getMsg('transaction.field.credit'), 
                            id: 'comprobanttransactionpercentage',
                            name: 'comprobanttransactiondebt', 
                            inputValue: true, 
                            checked: true
                        },{
                            boxLabel: bundle.getMsg('transaction.field.debit'), 
                            id: 'comprobanttransactiondebt', 
                            name: 'comprobanttransactiondebt', 
                            inputValue: false
                        }],
                        listeners: {
                            change: function(group, radio){
                                var node = Ext.getCmp('comprobantaccountcombo').getSelectedNode(Ext.getCmp('comprobantaccountcombo').getValue());
                                window['ComprobantApp'].validateAccountForTransaction(radio.inputValue, node, Ext.getCmp('comprobantaccountcombo'));
                                    
                                Ext.getCmp('comprobantumcombo').reset();
                            },
                            beforequery: function(queryEvent) {
                                queryEvent.combo.getTree().setHeight(queryEvent.combo.maxHeight);
                                this.setValue(queryEvent.query);
                            }
                        }
                    },{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'+bundle.getMsg('account.field.label')+'<span style="color:red;"><sup>*</sup></span>:&nbsp;'
                    }, new Ext.ux.TreeCombo({
                        id: 'comprobantaccountcombo',
                        name: 'accountid',
                        fieldLabel: bundle.getMsg('account.field.label'),
                        emptyText: bundle.getMsg('app.form.select'),
                        typeAhead: true,
                        valueField: 'id',    
                        displayField: 'name',
                        triggerAction:'all',
                        width: 170, 
                        maxHeight: 225,
                        treeWidth: 225,
                        root: new Ext.tree.AsyncTreeNode({
                            text: 'root',
                            id:'NULL'
                        }),
                        rootVisible: false,
                        loader: new Ext.tree.TreeLoader({
                            dataUrl: config.app_host + '/account/request/method/load/component/tree',
                            baseParams: {
                                entityid: config.multientityapp ? config.app_entityid : ''
                            },
                            listeners: {
                                load: window['ComprobantApp'].renderNode,
                                beforeload: function(loader, node, callback){
                                    if(config.multientityapp)
                                        loader.baseParams.entityid = config.app_entityid;
                                }
                            }
                        }),
                        listeners: {
                            select: function(combo, node){
                                combo.el.removeClass(combo.emptyClass);
                                window['ComprobantApp'].validateAccountForTransaction(Ext.getCmp('comprobanttransactionisdebt').getValue().inputValue, node, combo);
                                    
                                Ext.getCmp('comprobantumcombo').reset();
                            },
                            beforequery: function(queryEvent) {
                                queryEvent.combo.getTree().setHeight(queryEvent.combo.maxHeight);
                                this.setValue(queryEvent.query);
                            }
                        },
                        allowBlank:false
                    }),{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;$<span style="color:red;"><sup>*</sup></span>&nbsp;'
                    },new Ext.ux.form.SpinnerField({
                        id: 'comprobanttransactionprice',
                        width: 80,
                        minValue: 0,
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 2,
                        incrementValue: 0.5,
                        accelerate: true
                    }),{
                        xtype: 'displayfield', 
                        value: '&nbsp;'
                    }, new Ext.form.ComboBox({
                        id: 'comprobantcurrencycombo',
                        name: 'currencyid',
                        width: 90,
                        store: window['CurrencyApp'].comboStore,
                        listeners: {
                            focus: function(combo) {
                                combo.getStore().load();
                            }
                        },
                        valueField: 'id',    
                        displayField: 'code',
                        tpl: '<tpl for="."><div ext:qtip="<b>{name}</b>: {comment}" class="x-combo-list-item">{code}</div></tpl>',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        selectOnFocus:true,
                        forceSelection:true,
                        allowBlank: false,
                        emptyText: bundle.getMsg('app.form.select')
                    }),{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'+bundle.getMsg('app.form.amount')+':&nbsp;'
                    },new Ext.ux.form.SpinnerField({
                        id: 'comprobanttransactionamount',
                        disabled: true,
                        width: 60,
                        minValue: 0,
                        allowDecimals: true,
                        decimalPrecision: 2,
                        incrementValue: 0.5,
                        allowBlank: false,
                        accelerate: true
                    }),{
                        xtype: 'displayfield', 
                        value: '&nbsp;'
                    }, new Ext.form.ComboBox({
                        id: 'comprobantumcombo',
                        name: 'umid',
                        disabled: true,
                        width: 90,
                        store: window['UmApp'].comboStore,
                        listeners: {
                            focus: function(combo) {
                                var node = Ext.getCmp('comprobantaccountcombo').getSelectedNode(Ext.getCmp('comprobantaccountcombo').getValue());
                                combo.getStore().load({
                                    params:{
                                        filter: node && node.attributes && node.attributes.Element && node.attributes.Element.id ? '[{"type":"int","value":'+node.attributes.Element.umid+',"field":"elementid"}]' : ''
                                    },
                                    callback: function(records, options, success ){
                                        if(!records || (records && records.length < 1)){
                                            var msg = String.format(bundle.getMsg("comprobant.action.findelement.norecords"),  bundle.getMsg('um.tab.label').toLowerCase(), bundle.getMsg('element.field.label').toLowerCase(), node.text);
                                            combo.markInvalid(msg);
                                            Ext.Base.msg(bundle.getMsg('app.msg.info.title'), msg);
                                        }
                                    }
                                });
                            },
                            change: function(combo, newValue, oldValue) {
                                var node = Ext.getCmp('comprobantaccountcombo').getSelectedNode(Ext.getCmp('comprobantaccountcombo').getValue());
                                
                                if(Ext.getCmp('comprobanttransactionisdebt').getValue().inputValue == true && node && node.attributes && node.attributes.element && node.attributes.element.amount){
                                    var val = node.attributes.element.amount[newValue].amount;
                                    if(val > 0)
                                        Ext.getCmp('comprobanttransactionamount').setMaxValue(val);
                                }
                                
                            }
                        },
                        valueField: 'id',    
                        displayField: 'name',
                        tpl: '<tpl for="."><div ext:qtip="{comment}" class="x-combo-list-item">{name}</div></tpl>',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        selectOnFocus:true,
                        forceSelection:true,
                        emptyText: bundle.getMsg('app.form.select')
                    }), '->',{
                        tooltip: bundle.getMsg('app.form.addrow'),
                        iconCls: Ext.ux.Icon('table_row_insert'),
                        listeners: {
                            click: function(button, eventObject) { 
                                if(Ext.getCmp('comprobanttransactionisdebt').isValid() && 
                                    Ext.getCmp('comprobanttransactionprice').isValid() && 
                                    Ext.getCmp('comprobantcurrencycombo').isValid() && 
                                    Ext.getCmp('comprobantaccountcombo').isValid() && 
                                    Ext.getCmp('comprobanttransactionamount').isValid() && 
                                    Ext.getCmp('comprobantumcombo').isValid()){
                                    var node = Ext.getCmp('comprobantaccountcombo').getSelectedNode(Ext.getCmp('comprobantaccountcombo').getValue());
                                    var index = -1;
                                    index = Ext.getCmp('comprobantumcombo').getStore().find('id', Ext.getCmp('comprobantumcombo').getValue());
                                    var um = index > -1 ? Ext.getCmp('comprobantumcombo').getStore().getAt(index) : false;
                                    index = Ext.getCmp('comprobantcurrencycombo').getStore().find('id', Ext.getCmp('comprobantcurrencycombo').getValue());
                                    var currency = index > -1 ? Ext.getCmp('comprobantcurrencycombo').getStore().getAt(index) : false;
                                    
                                    var debitave = 0;
                                    if(Ext.getCmp('comprobanttransactionisdebt').getValue().inputValue == true && node && node.attributes && node.attributes.element && node.attributes.element.debitave && node.attributes.element.debitave[um.get('id')])
                                        debitave = node.attributes.element.debitave[um.get('id')].debit;
                                    
                                    var amount = Ext.getCmp('comprobanttransactionamount').getValue();
                                    if(!amount)
                                        amount = 1;
                                    
                                    window['ComprobantApp'].selectedTransactionsComboStore.insert(window['ComprobantApp'].selectedTransactionsComboStore.getCount(), new Ext.data.Record({
                                        nodeobj: node ? node : false,
                                        
                                        umobj: um,
                                        um: um ? um.get('name') : '',
                                        
                                        currencyobj: currency,
                                        currency: currency ? currency.get('code') : '',
                                        
                                        amount: amount,
                                        account: node && node.attributes && node.attributes.manualcode ? node.attributes.code + " " + node.attributes.name : node.attributes.name,
                                        costcenter: node && node.attributes && node.attributes.Costcenter && node.attributes.Costcenter.name ? node.attributes.Costcenter.name : '',
                                        
                                        debit: Ext.getCmp('comprobanttransactionisdebt').getValue().inputValue == false ? Ext.getCmp('comprobanttransactionprice').getValue()*amount : '',
                                        credit: Ext.getCmp('comprobanttransactionisdebt').getValue().inputValue == true ? Ext.getCmp('comprobanttransactionprice').getValue()*amount : '',
                                        
                                        creditave: Ext.getCmp('comprobanttransactionisdebt').getValue().inputValue == true ? (Ext.getCmp('comprobanttransactionprice').getValue() - debitave * currency.get('rate')) * amount : ''
                                    }));
                                    
                                    Ext.getCmp('comprobanttransactionisdebt').reset();
                                    Ext.getCmp('comprobanttransactionprice').reset();
                                    Ext.getCmp('comprobantcurrencycombo').reset();
                                    Ext.getCmp('comprobantaccountcombo').reset();
                                    Ext.getCmp('comprobanttransactionamount').reset();
                                    Ext.getCmp('comprobantumcombo').reset();
                                }
                            }
                        }
                    },{
                        tooltip: bundle.getMsg('app.form.deleterow'),
                        id: 'btnRemoveComprobantTransaction',
                        disabled: true,
                        iconCls: Ext.ux.Icon('table_row_delete'),
                        listeners: {
                            click: function(button, eventObject) {
                                var records = Ext.getCmp('gpComprobantTransactions').getSelectionModel().getSelections();
                                window['ComprobantApp'].selectedTransactionsComboStore.remove(records);
                            }
                        }
                    }]
                })]
            });
            
        },
        
        renderNode : function(treeLoader, node, response){
            if(node.getOwnerTree().columns){
                node.getOwnerTree().treeGridSorter = new Ext.ux.tree.TreeGridSorter(node.getOwnerTree(), {
                    property: node.getOwnerTree().columns[0].dataIndex
                });
                node.getOwnerTree().treeGridSorter.doSort(node);
            }
                                
            if(response.responseText.indexOf('signinForm')>0)
                showSesionExpiredMsg();
            
            for(var i = 0; i < node.childNodes.length; i++){
                if(!node.childNodes[i].attributes.deleteable || node.childNodes[i].attributes.deleteable == 0)
                    node.childNodes[i].getUI().addClass('row-italic');
                
                node.childNodes[i].setTooltip(node.childNodes[i].attributes.name);
                if(node.childNodes[i].attributes.manualcode){
                    node.childNodes[i].attributes.code = node.childNodes[i].attributes.code.substring(node.childNodes[i].attributes.code.indexOf('->')+2,node.childNodes[i].attributes.code.length);
                    node.childNodes[i].setTooltip(node.childNodes[i].attributes.name, node.childNodes[i].attributes.code);
                }
                
                node.childNodes[i].setIconCls(Ext.ux.Icon('money'));
                if(node.childNodes[i].leaf == 1)
                    node.childNodes[i].setIconCls(Ext.ux.Icon('money_open'));
                if(!node.childNodes[i].attributes.comment)
                    node.childNodes[i].attributes.comment = '';
                if(node.childNodes[i].attributes && node.childNodes[i].attributes && node.childNodes[i].attributes.customicon && node.childNodes[i].attributes.customicon != ''){
                    var extension = node.childNodes[i].attributes.customicon;
                    while(extension.indexOf('.')>-1)
                        extension = extension.substring(extension.indexOf('.')+1, extension.length);
                    var icon = node.childNodes[i].attributes.customicon.replace('.'+extension, '');
                    node.childNodes[i].setIconCls(Ext.ux.Icon(icon, 'famfamfamflag'));
                }
            }
        },
        
        checkClosure : function(component, callback){
            if(component.isValid()){
                var year = Ext.getCmp('comprobanttransactiondate').getValue().format('Y');
                new Ext.data.Connection().request({
                    url: config.app_host + '/closeup/request/method/load/component/grid/start/0/limit/12',
                    method: 'POST',
                    params: {
                        filter: '[{"type":"date","comparison":"let","value":"31/12/'+year+'","field":"creationdate"},{"type":"date","comparison":"get","value":"01/01/'+year+'","field":"creationdate"}]',
                        entityid: config.multientityapp ? config.app_entityid : ''
                    },
                    callback : function(options, success, response) {
                        var object = Ext.decode(response.responseText); 
                        if(object && object.data && object.data.length && object.data.length>0){
                            Ext.Msg.show({
                                title:bundle.getMsg('app.msg.info.title'),
                                msg: String.format(bundle.getMsg('account.action.closure.exerciseclosed'), year),
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.INFO
                            });
                        }
                        else
                        if(callback)
                            callback();
                    }
                });
            }
        },
        
        showWindow : function(animateTarget, hideApply, callback){
            var cancelFn = function(){
                window['ComprobantApp'].formPanel.getForm().reset();
                Ext.getCmp('comprobanttransactionisdebt').reset();
                Ext.getCmp('comprobanttransactionprice').reset();
                Ext.getCmp('comprobantaccountcombo').reset();
                Ext.getCmp('comprobanttransactionamount').reset();
                Ext.getCmp('comprobantumcombo').reset();                    
                window['ComprobantApp'].selectedTransactionsComboStore.removeAll();
                    
                window['ComprobantApp'].window.hide();
            };
            
            window['ComprobantApp'].window = App.showWindow(bundle.getMsg('comprobant.window.title'), 850, 450, window['ComprobantApp'].formPanel, 
                function(button){
                    if(!button){
                        button = new Object;
                        button.id = window['UmApp'].window.submitBtn.id;
                    }
                    
                    if(window['ComprobantApp'].selectedTransactionsComboStore.getCount() < 1){
                        Ext.Msg.show({
                            title:bundle.getMsg('app.msg.error.title'),
                            msg:  bundle.getMsg('comprobant.action.error.notransaction'),
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                        return;
                    }
                
                    var saveFn = function(){
                        var records = window['ComprobantApp'].gridPanel.getSelectionModel().getSelections();
                    
                        var transactions = new Array();
                        window['ComprobantApp'].selectedTransactionsComboStore.each(function(record){
                            var r = new Object;
                        
                            r.accountid = record.get('nodeobj') ? record.get('nodeobj').id : false;
                            r.debit = record.get('debit');
                            r.credit = record.get('credit');
                            r.creditave = record.get('creditave');
                            r.currencyid = record.get('currencyobj') ? record.get('currencyobj').id : false;
                            r.amount = record.get('amount');
                            r.umid = record.get('umobj') ? record.get('umobj').id : false;
                        
                            transactions.push(r);
                        });
                            
                        window['ComprobantApp'].formPanel.getForm().submit({
                            waitTitle : bundle.getMsg('app.msg.wait.title'), 
                            waitMsg: bundle.getMsg('app.msg.wait.text'), 
                            clientValidation: true,
                            //submitEmptyText: false,
                            params: {
                                id: records[0] ? records[0].get('id'):'',
                                transactions: Ext.encode(transactions),
                                entityid: config.multientityapp ? config.app_entityid : ''
                            },
                            success: function(form, action) {
                                checkSesionExpired(form, action);
                                window['ComprobantApp'].store.load({
                                    params:{
                                        start: window['ComprobantApp'].gridPanel.getBottomToolbar().cursor
                                    }
                                }); 
                            
                                submitFormSuccessful('ComprobantApp', form, action, button, !records[0], cancelFn, callback);
                            },
                            failure: loadFormFailed
                        });
                    };
                    window['ComprobantApp'].checkClosure(Ext.getCmp('comprobanttransactiondate'), saveFn);
                }, 
                cancelFn, 
                animateTarget);
        },
        
        validateAccountForTransaction : function(isdebt, node, field){
            var msg = '';
            
            if(node && node.id != 'NULL' && (!node.leaf || node.leaf == "0")){
                msg = String.format(bundle.getMsg("comprobant.action.selectaccount.noleaf"), node.attributes.name);
                if(node.attributes.manualcode)
                    msg = String.format(bundle.getMsg("comprobant.action.selectaccount.noleaf"), node.attributes.code + " " + node.attributes.name);
                field.markInvalid(msg);
            }
                                
            if((node && node.id != 'NULL' && node.attributes && node.attributes.nature == !isdebt)||
                (node && node.id != 'NULL' && node.attributes && !node.attributes.nature == isdebt)){
                msg = String.format(bundle.getMsg("comprobant.action.selectaccount.wrongnature"), node.attributes.name);
                if(node.attributes.manualcode)
                    msg = String.format(bundle.getMsg("comprobant.action.selectaccount.wrongnature"), node.attributes.code + " " + node.attributes.name);
            }
            
            if(msg != '')
                Ext.Base.msg(bundle.getMsg('app.msg.info.title'), msg);
            
            var elementable = node && node.id != 'NULL' && node.attributes && node.attributes.Element && node.attributes.Element.id !='';
            if(!elementable){
                Ext.getCmp('comprobanttransactionamount').reset();
                Ext.getCmp('comprobantumcombo').reset();                
            }
            Ext.getCmp('comprobanttransactionamount').setDisabled(!elementable);
            Ext.getCmp('comprobantumcombo').setDisabled(!elementable);
        },
        
        decodeDetails : function(transactions){  
            var details = '<tr>\
                <td tabindex="0" style="width: 30%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                    <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + bundle.getMsg('account.field.label') + '<hr/></div>\
                </td>\
                <td tabindex="0" style="width: 15%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                    <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + bundle.getMsg('transaction.field.debit') + '<hr/></div>\
                </td>\
                <td tabindex="0" style="width: 15%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                    <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + bundle.getMsg('transaction.field.credit') + '<hr/></div>\
                </td>\
                <td tabindex="0" style="width: 15%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                    <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + bundle.getMsg('currency.field.label') + '<hr/></div>\
                </td>\
                <td tabindex="0" style="width: 15%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                    <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + bundle.getMsg('app.form.amount') + '<hr/></div>\
                </td>\
                <td tabindex="0" style="width: 20%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                    <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + bundle.getMsg('um.field.label') + '<hr/></div>\
                </td>\
                <td tabindex="0" style="width: 20%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                    <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + bundle.getMsg('element.field.label') + '<hr/></div>\
                </td>\
            </tr>';
            for (var i = 0; i < transactions.length; i++){
                var account = '-';
                if(transactions[i].Account){
                    account = transactions[i].Account.name;
                    if(transactions[i].Account.manualcode){ 
                        transactions[i].Account.code = transactions[i].Account.code.substring(transactions[i].Account.code.indexOf('->')+2,transactions[i].Account.code.length);
                        account = transactions[i].Account.code + " " + transactions[i].Account.name;
                    }
                }
                
                var um = '-';
                if(transactions[i].Um && transactions[i].Um.name!='')
                    um = transactions[i].Um.name;
                
                var element = '-';
                if(transactions[i].Account && transactions[i].Account.Element && transactions[i].Account.Element.name != '')
                    element = transactions[i].Account.Element.name;
                
                var amount = '-';
                if(transactions[i].amount && transactions[i].amount!='')
                    amount = transactions[i].amount;
                
                var currencyname = '-';
                if(transactions[i].Currency)
                    currencyname = transactions[i].Currency.code;
                
                details += '<tr>\
                    <td tabindex="0" style="width: 30%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                        <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + account + '</div>\
                    </td>\
                    <td tabindex="0" style="width: 15%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                        <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">$' + transactions[i].debit + '</div>\
                    </td>\
                    <td tabindex="0" style="width: 15%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                        <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">$' + transactions[i].credit + '</div>\
                    </td>\
                    <td tabindex="0" style="width: 15%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                        <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + currencyname + '</div>\
                    </td>\
                    <td tabindex="0" style="width: 15%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                        <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + amount + '</div>\
                    </td>\
                    <td tabindex="0" style="width: 20%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                        <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + um + '</div>\
                    </td>\
                    <td tabindex="0" style="width: 20%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                        <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + element + '</div>\
                    </td>\
                </tr>';
            }
            
            return details;
        },
        
        applySecurity : function(groups, permissions){
            window['ComprobantApp'].gridPanel.addBtn.setVisible(permissions.indexOf('managecomprobant') != -1 || permissions.indexOf('managecomprobantadd') != -1);
            window['ComprobantApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('managecomprobant') != -1 || permissions.indexOf('managecomprobantedit') != -1);
            window['ComprobantApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('managecomprobant') != -1 || permissions.indexOf('managecomprobantdelete') != -1);
            
        }
    }
}();

