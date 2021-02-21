Ext.ux.grid.GroupSummary.Calculations['totalCost'] = function(v, record, field){
    return v + (record.data.estimate * record.data.rate);
};

Ext.ux.grid.GroupSummary.Calculations['total'] = function(v, record, field){
    var rate = record.data.rate;
    return  v + (record.data.credit/rate - record.data.debit/rate);
};
Ext.ux.grid.GroupSummary.Calculations['creditrate'] = function(v, record, field){
    var rate = record.data.rate;
    return v + record.data.credit/rate;
};
Ext.ux.grid.GroupSummary.Calculations['debitrate'] = function(v, record, field){
    var rate = record.data.rate;
    return v + record.data.debit/rate;
};
var summary = new Ext.ux.grid.GroupSummary();

TransactionApp = function() {
    return {
        init : function(TransactionApp) {
            
            this.limit = config.app_elementsongrid;
						
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/transaction/request/method/load',
                baseParams:{
                    component: 'grid',
                    start:0,
                    limit: window['TransactionApp'].limit,
                    entityid: config.app_entityid && config.app_entityid !='*'?config.app_entityid:''
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: function(store, records, options){
                        store.each(function(record){
                            //                            var obj = window['TransactionApp'].formatTransactionAnnexes(record);
                            //                            record.set('obj', obj);
                            });  
                        
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : function(){}
                },
                groupField:'costcenterstr'
            });
            
            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/transaction/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(){},
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : function(){}
                }
            });
			
            this.filters = new Ext.ux.grid.GridFilters({
                encode: true,
                local: false,
                menuFilterText: bundle.getMsg('app.languaje.find.label'),
                filters: [{
                    type: 'numeric',
                    dataIndex: 'debit'
                },{
                    type: 'numeric',
                    dataIndex: 'credit'
                },{
                    type: 'date',
                    dataIndex: 'creationdate',
                    beforeText: bundle.getMsg('app.languaje.find.beforethan'),
                    afterText: bundle.getMsg('app.languaje.find.afterthan'),
                    onText: bundle.getMsg('app.languaje.find.ondate'),
                    dateFormat: Date.patterns.NonISO8601Short
                },{
                    type: 'date',
                    dataIndex: 'paymentdate',
                    beforeText: bundle.getMsg('app.languaje.find.beforethan'),
                    afterText: bundle.getMsg('app.languaje.find.afterthan'),
                    onText: bundle.getMsg('app.languaje.find.ondate'),
                    dateFormat: Date.patterns.NonISO8601Short
                },{
                    type: 'numeric',
                    dataIndex: 'person_id'
                },{
                    type: 'string',
                    dataIndex: 'comment'
                }]
            });
			
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelTransaction',
                region:'center',
                layout: 'fit', 
                title: config.app_showgridtitle ? bundle.getMsg("transaction.grid.title") : '',
                iconCls: Ext.ux.Icon('creditcards'),
                autoExpandColumn: 'transactionautoexpandcolumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'help',
                    qtip: bundle.getMsg('app.layout.help'),
                    handler: function(button, eventObject) {
                        window.open('../uploads/docs/usermanual.pdf#page=37&zoom=auto,26,444');
                    }
                }],
				
                columns:[{
                    xtype: 'datecolumn', 
                    format: Date.patterns.NonISO8601Long1, 
                    header: bundle.getMsg('comprobant.field.creationdate'), 
                    width: 60, 
                    dataIndex: 'creationdatestr'
                },{
                    id:'comprobanttransactionmaincolumn', 
                    header: bundle.getMsg('account.field.label'),
                    width: 170, 
                    sortable: true, 
                    dataIndex: 'accountstr', 
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
                    hidden: true, 
                    header: bundle.getMsg('costcenter.field.label'),
                    width: 70, 
                    sortable: true, 
                    dataIndex: 'costcenterstr'
                },{
                    header: bundle.getMsg('app.form.amount'),
                    width: 30, 
                    sortable: true, 
                    dataIndex: 'amount'
                },{
                    header: bundle.getMsg('um.field.label'),
                    width: 60, 
                    sortable: true, 
                    dataIndex: 'umstr'
                },{
                    header: bundle.getMsg('element.field.label'),
                    width: 60, 
                    sortable: true, 
                    dataIndex: 'elementstr'
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
                    header: bundle.getMsg('currency.field.label'),
                    width: 30, 
                    sortable: true, 
                    dataIndex: 'currencystr', 
                    summaryType: 'total',
                    summaryRenderer: function(v, params, data){
                        return '<b>'+config.app_currencycode+'</b>';
                    }
                }],
				
                view: new Ext.grid.GroupingView({
                    markDirty: false,
                    forceFit:true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? bundle.getMsg("app.form.elements") : bundle.getMsg("app.form.element")]})'
                }),
				
                plugins: [this.filters, summary],
				
                stripeRows: true,
            
                listeners: {
                    activate: function(gridpanel){
                        gridpanel.getStore().load();
                    },
                    rowclick : function(grid, rowIndex, eventObject) {
                        
                    }
                },
                
                tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('app.form.since')+':'), {
                    xtype:'datefield',
                    width: 90, 
                    id: 'transactionfromdate'
                }, new Ext.Toolbar.TextItem('  '+bundle.getMsg('app.form.to')+':'), {
                    xtype:'datefield',
                    width: 90, 
                    id: 'transactiontodate'
                },{
                    text: bundle.getMsg('app.form.apply'),
                    iconCls: Ext.ux.Icon('tickpluss', 'myicons'),
                    handler: function(){
                        window['TransactionApp'].gridPanel.filters.clearFilters();
                        
                        window['TransactionApp'].startdate = Ext.getCmp('transactionfromdate').getValue();
                        window['TransactionApp'].enddate = Ext.getCmp('transactiontodate').getValue();
                        
                        if(window['TransactionApp'].startdate && window['TransactionApp'].enddate){
                            window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                'after': window['TransactionApp'].startdate,
                                'before': window['TransactionApp'].enddate
                            });
                            window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                        }
                        else
                        if(window['TransactionApp'].startdate || window['TransactionApp'].enddate){
                            if(window['TransactionApp'].startdate)
                                window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                    'after': window['TransactionApp'].startdate
                                });                            
                            if(window['TransactionApp'].enddate)
                                window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                    'before': window['TransactionApp'].enddate
                                });
                            window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                        }
                        
                        window['TransactionApp'].gridPanel.filters.reload();                            
                            
                        Ext.getCmp('transactionallfilter').setChecked(false);
                    }
                },'->',{
                    text: bundle.getMsg('app.form.applyfilters'),
                    iconCls: Ext.ux.Icon('table_gear'),
                    ref: '../filtersBtn',
                    menu : {
                        items: [{
                            id: 'transactionallfilter',
                            text: bundle.getMsg('transaction.filter.all'),
                            checked: true,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    window['TransactionApp'].gridPanel.filters.clearFilters();                                    
                                    window['TransactionApp'].gridPanel.paginBtn.fireEvent('click', window['TransactionApp'].gridPanel.paginBtn);
                                    Ext.getCmp('transactionfromdate').reset();
                                    Ext.getCmp('transactiontodate').reset();
                                }
                            }
                        },'-','<b class="menu-title">En el tiempo</b>',{
                            text: bundle.getMsg('transaction.filter.day'),
                            checked: false,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    window['TransactionApp'].gridPanel.filters.clearFilters();
                                    
                                    var date = new Date();
                                        
                                    window['TransactionApp'].startdate = date;
                                    
                                    window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                        'on': window['TransactionApp'].startdate
                                    });
                                    window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                            
                                    window['TransactionApp'].gridPanel.filters.reload();
                                }
                            }
                        },{
                            text: bundle.getMsg('transaction.filter.month'),
                            checked: false,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    window['TransactionApp'].gridPanel.filters.clearFilters();
                                    
                                    var date = new Date();
                                        
                                    window['TransactionApp'].startdate = date.getFirstDateOfMonth();
                                    window['TransactionApp'].enddate = date.getLastDateOfMonth();
                                    
                                    window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                        'after': window['TransactionApp'].startdate,
                                        'before': window['TransactionApp'].enddate
                                    });
                                    window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                            
                                    window['TransactionApp'].gridPanel.filters.reload();
                                }
                            }
                        },{
                            text: bundle.getMsg('transaction.filter.year'),
                            checked: false,
                            group: 'theme',
                            listeners: {
                                click: function(button, eventObject) {
                                    window['TransactionApp'].gridPanel.filters.clearFilters();
                                                                        
                                    var date = new Date();
                                        
                                    window['TransactionApp'].startdate = Date.parseDate(date.format('Y')+'-01-01', 'Y-m-d');
                                    window['TransactionApp'].enddate = Date.parseDate(date.format('Y')+'-12-31', 'Y-m-d');
                                    
                                    window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setValue({
                                        'after': window['TransactionApp'].startdate,
                                        'before': window['TransactionApp'].enddate
                                    });
                                    window['TransactionApp'].gridPanel.filters.getFilter('creationdate').setActive(true);
                            
                                    window['TransactionApp'].gridPanel.filters.reload();
                                }
                            }
                        }]
                    }
                },'-',{
                    text: 'Reporte',
                    iconCls: Ext.ux.Icon('report'),
                    ref: '../reportsBtn',
                    listeners: {
                        click: function(button, eventObject) {
                            var url = '/transaction/report?val=val';
                            
                            var startdate = Ext.getCmp('transactionfromdate').getValue();
                            if(startdate)
                                url = url + '&fromdate=' + startdate.format(Date.patterns.NonISO8601Short);
                            
                            var enddate = Ext.getCmp('transactiontodate').getValue();
                            if(enddate)
                                url = url + '&todate=' + enddate.format(Date.patterns.NonISO8601Short);
                            
                            App.printView(url, ' ', ' ');
                        }
                    }
                }],
            
                bbar: new Ext.PagingToolbar({
                    pageSize: parseInt(window['TransactionApp'].limit),
                    store: this.store,
                    plugins: new Ext.ux.ProgressBarPager(),
                    items: [{
                        tooltip: bundle.getMsg('app.form.deleterow'),
                        ref: 'deleteRowBtn',
                        hidden: true,
                        iconCls: Ext.ux.Icon('table_row_delete'),
                        listeners: {
                            click: function(button, eventObject) {
                            //                                Ext.Msg.show({
                            //                                    title: bundle.getMsg('app.msg.warning.title'),
                            //                                    msg: bundle.getMsg('app.msg.warning.deleteselected.text'),
                            //                                    buttons: Ext.Msg.YESNO,
                            //                                    fn: function(btn, text){
                            //                                        if (btn == 'yes'){
                            //											
                            //                                            var records = window['TransactionApp'].gridPanel.getSelectionModel().getSelections();
                            //											
                            //                                            var array=new Array();                                
                            //                                            for (var i=0; i<records.length; i++)
                            //                                                array.push(records[i].get('id'));
                            //												
                            //                                            new Ext.data.Connection().request({
                            //                                                url: config.app_host + '/transaction/request/method/delete',
                            //                                                params: {
                            //                                                    ids: Ext.encode(array)
                            //                                                },
                            //                                                failure: requestFailed,
                            //                                                success: requestSuccessful,
                            //                                                callback : function(options, success, response) {
                            //                                                    window['TransactionApp'].gridPanel.getStore().load();
                            //                                                }
                            //                                            });
                            //                                        }
                            //                                    },
                            //                                    animEl: 'elId',
                            //                                    icon: Ext.MessageBox.QUESTION
                            //                                });
                            }
                        }
                    },{
                        tooltip: bundle.getMsg('app.form.clearfilters'),
                        iconCls: Ext.ux.Icon('table_lightning'),
                        handler: function () {
                            window['TransactionApp'].gridPanel.filters.clearFilters();
                            
                            Ext.getCmp('transactionperson').reset();
                            window['TransactionApp'].personRecord = false;
                            
                            Ext.getCmp('transactionfromdate').reset();
                            Ext.getCmp('transactiontodate').reset();
                        } 
                    }],
                    displayInfo: true,
                    displayMsg: bundle.getMsg('app.form.bbar.displaymsg'),
                    emptyMsg: bundle.getMsg('app.form.bbar.emptymsg')
                }),
                
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:false
                })
            });
        },
        
        showWindow : function(animateTarget, hideApply, callback){
            
        },
        
        applySecurity : function(groups, permissions){
            
        }
    }
}();