/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package SGArqBase
 * @subpackage currency
 * @author MSc. Donel Vázquez Zambrano
 * @version 1.0.0
 */

CurrencyApp = function() {
    return {
        init : function(CurrencyApp) {
            
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/currency/request/method/load',
                baseParams:{
                    component: 'grid',
                    start: 0,
                    limit: config.app_elementsongrid
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: function(store, records) { 
                        alertNoRecords(records);
                        if(config.app_showmessageonstoreloadsuccessful)
                            loadStoreSuccessful(store, records);
                        
                    //                        for(var i = 0; i < records.length; i++){
                    //                            var index = window['CurrencyApp'].periodTypeComboStore.find('id', records[i].get('period'));
                    //                            var record = window['CurrencyApp'].periodTypeComboStore.getAt(index);
                    //                            if(record)
                    //                                records[i].set('valueperiod', records[i].get('value') + ' ' + record.get('name'));
                    //                            else
                    //                                records[i].set('valueperiod', records[i].get('value'));
                    //                        }
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                },
                groupField:'isactive'
            });

            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/currency/request/method/load',
                baseParams:{
                    component: 'combo',
                    filter: '[{"type":"bool","value":1,"field":"isactive"}]'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('currency.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });
			
            this.filters = new Ext.ux.grid.GridFilters({
                encode: true,
                local: false,
                menuFilterText: bundle.getMsg('app.languaje.find.label'),
                filters: [{
                    type: 'string',
                    dataIndex: 'code'
                },{
                    type: 'string',
                    dataIndex: 'name'
                },{
                    type: 'string',
                    dataIndex: 'comment'
                }]
            });

            this.infoTextItem = new Ext.Toolbar.TextItem('');
			
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelCurrency',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('money'),
                title: config.app_showgridtitle ? bundle.getMsg("currency.grid.title") : '',
                autoExpandColumn: 'currencymaincolumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['CurrencyApp'].gridPanel);
                    }
                },{
                    id:'help',
                    qtip: bundle.getMsg('app.layout.help'),
                    handler: function(button, eventObject) {
                        window.open('../uploads/docs/usermanual.pdf#page=20&zoom=auto,26,471');
                    }
                }],
                keys: [panelKeysMap],

                listeners: {
                    activate: function(gridpanel){
                        gridpanel.getStore().load();
                    },
                    rowclick : function(grid, rowIndex, eventObject) {
                        var selectionModel = grid.getSelectionModel();
                        App.selectionChange(selectionModel);
                    },
                    rowdblclick : function(grid, rowIndex, eventObject) {
                        if(grid.updateBtn && !grid.updateBtn.disabled && !grid.updateBtn.hidden)
                            grid.updateBtn.fireEvent('click', grid.updateBtn);
                    },
                    filterupdate: function(){
                        var text = App.getFiltersText(window['CurrencyApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['CurrencyApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['CurrencyApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['CurrencyApp'].infoTextItem.getEl()).update('');
                    }
                },
				
                columns: [new Ext.grid.RowNumberer(),{
                    header: bundle.getMsg('app.form.code'), 
                    width: 100, 
                    sortable: true, 
                    dataIndex: 'code'
                },{
                    id:'currencymaincolumn', 
                    header: bundle.getMsg('app.form.name'), 
                    width: 270, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    xtype: 'numbercolumn', 
                    format: '0,0.00000', 
                    header: bundle.getMsg('app.form.rate'), 
                    width: 130, 
                    dataIndex: 'rate'
                },{
                    id:'currencymaincolumn', 
                    header: bundle.getMsg('app.form.comment'),
                    width: 500,
                    dataIndex: 'comment'
                },{
                    xtype: 'booleancolumn', 
                    align: 'center', 
                    trueText: bundle.getMsg('app.form.yes'), 
                    falseText: bundle.getMsg('app.form.no'), 
                    header: bundle.getMsg('user.is.active'), 
                    width: 70, 
                    sortable: true,
                    hidden: true,
                    dataIndex: 'isactive'
                }],
				
                view: new Ext.grid.GroupingView({
                    markDirty: false,
                    forceFit:true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? bundle.getMsg("app.form.elements") : bundle.getMsg("app.form.element")]})'
                }),
				
                plugins: [this.filters],
				
                stripeRows: true,			
                tbar: [{
                    text: bundle.getMsg('app.form.add'),
                    iconCls: Ext.ux.Icon('add'),
                    ref: '../addBtn',
                    listeners: {
                        click: function(button, eventObject, hideApply, callback) {
                            window['CurrencyApp'].gridPanel.getSelectionModel().clearSelections();
                            window['CurrencyApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
                        }
                    }
                },{
                    ref: '../updateBtn',
                    text: bundle.getMsg('app.form.info'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('information'),
                    listeners: {
                        click: function(button, eventObject, hideApply, callback) {
                            App.mask.show();
                            //                            Ext.getCmp('changebtn').setDisabled(true);
                            var record = window['CurrencyApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){
                                window['CurrencyApp'].formPanel.getForm().loadRecord(record);
                                                                        
                                //                                Ext.getCmp('changebtn').setDisabled(!Ext.getCmp('code').isValid());
                                //                                Ext.getCmp('resumerate').setValue(parseFloat('1').toFixed(5));
									
                                var val = record.get('isactive');
                                Ext.getCmp('isactive').setValue('percentage', val);
                                Ext.getCmp('isactive').setValue('fixed', !val);
                            }
                            else
                                window['CurrencyApp'].formPanel.getForm().reset();
                            window['CurrencyApp'].showWindow(button.getEl(), hideApply, callback);
                            App.mask.hide();
                        }
                    }
                },{
                    ref: '../removeBtn',
                    text: bundle.getMsg('app.form.delete'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('delete'),
                    listeners: {
                        click: function(button, eventObject, callback) {
                            Ext.defer(function(){
                                Ext.Msg.show({
                                    title: bundle.getMsg('app.msg.warning.title'),
                                    msg: bundle.getMsg('app.msg.warning.deleteselected.text'),
                                    buttons: Ext.Msg.YESNO,
                                    fn: function(btn, text){
                                        if (btn == 'yes'){			
                                            var records = window['CurrencyApp'].gridPanel.getSelectionModel().getSelections();
											
                                            var array = new Array();
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/currency/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        window['CurrencyApp'].store.load({
                                                            params:{
                                                                start: window['CurrencyApp'].gridPanel.getBottomToolbar().cursor
                                                            }
                                                        });
                                                        if(callback){
                                                            if(callback.fn)
                                                                callback.fn(callback.params);
                                                            else
                                                                callback();
                                                        }
                                                    }
                                                    else
                                                        requestFailed(response, false);

                                                }
                                            });
                                        }
                                    },
                                    animEl: 'elId',
                                    icon: Ext.MessageBox.QUESTION
                                });
                            }, 100, this);
                        }
                    }
                }],
				
                bbar: new Ext.PagingToolbar({
                    pageSize: parseInt(config.app_elementsongrid),
                    store: this.store,
                    plugins: [new Ext.ux.ProgressBarPager(), this.filters],
                    items: [{
                        tooltip: bundle.getMsg('app.form.clearfilters'),
                        iconCls: Ext.ux.Icon('table_lightning'),
                        handler: function () {
                            window['CurrencyApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['CurrencyApp'].infoTextItem.getEl()).update('');
                            window['CurrencyApp'].gridPanel.getSelectionModel().clearSelections();
                        } 
                    },'-', this.infoTextItem],
                    displayInfo: true,
                    displayMsg: bundle.getMsg('app.form.bbar.displaymsg'),
                    emptyMsg: String.format(bundle.getMsg('app.form.bbar.emptymsg'), bundle.getMsg('app.form.elements').toLowerCase())
                }),
				
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:false, 
                    listeners: {
                        selectionchange: App.selectionChange
                    }
                })
            });
			
            this.gridPanel.getView().getRowClass = function(record, index, rowParams, store) {
                if (record.get('base')) 
                    return 'row-background-blue';
                
                if (!record.get('deleteable')) 
                    return 'row-italic';
            };
			
            this.formPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/currency/request/method/save',
                frame:true,
                bodyStyle:'padding:5px 5px 0',
                keys: [formKeyMaping],
                items: [{
                    layout:'column',
                    items:[{
                        columnWidth:.35,
                        layout: 'form',
                        items: [{
                            xtype:'textfield',
                            id: 'code',
                            name: 'code',
                            fieldLabel: bundle.getMsg('app.form.code')+'<span style="color:red;"><sup>*</sup></span>',
                            allowBlank:false,
                            anchor:'-20',
                            listeners: {
                                change : function(field, newValue, oldValue) {
                                //                                    Ext.getCmp('changebtn').setDisabled(!field.isValid())
                                }
                            }
                        }]
                    },{
                        columnWidth:.65,
                        layout: 'form',
                        items: [{
                            xtype:'textfield',
                            name: 'name',
                            fieldLabel: bundle.getMsg('app.form.name')+'<span style="color:red;"><sup>*</sup></span>',
                            allowBlank:false,
                            anchor:'-20'
                        }]
                    }]
                },{
                    xtype:'textarea',
                    name: 'comment',
                    fieldLabel: bundle.getMsg('app.form.comment'),
                    anchor:'-20'
                },{
                    xtype: 'compositefield',
                    fieldLabel: bundle.getMsg('app.form.rate'),
                    combineErrors: false,
                    items: [new Ext.ux.form.SpinnerField({
                        id: 'rate',
                        name: 'rate',
                        width: 160,
                        minValue: 0,
                        allowDecimals: true,
                        decimalPrecision: 5,
                        incrementValue: 0.00001,
                        accelerate: true,
                        listeners: {
                            blur : function(field) {
                            //                                var val = 1/field.getValue();
                            //                                Ext.getCmp('resumerate').setValue(val.toFixed(5));
                            }
                        }
                    }),{
                        //                        xtype: 'button',
                        //                        id: 'changebtn',
                        //                        tooltip: bundle.getMsg('currency.button.change'), 
                        //                        disabled: true,
                        //                        text: '=',
                        //                        listeners: {
                        //                            click: function(button, eventObject) {
                        //                                var leftval = Ext.getCmp('rate').getValue();
                        //                                var rightval = Ext.getCmp('resumerate').getValue();
                        //                                Ext.getCmp('rate').setValue(parseFloat(rightval).toFixed(5));
                        //                                Ext.getCmp('resumerate').setValue((1/parseFloat(leftval)).toFixed(5));
                        //                                if (Ext.getCmp('code').getValue()==Ext.getCmp('resumeratecurrency').getValue())
                        //                                    Ext.getCmp('resumeratecurrency').setValue(config.app_currencycode);
                        //                                else
                        //                                    Ext.getCmp('resumeratecurrency').setValue(Ext.getCmp('code').getValue());
                        //                            }
                        //                        }
                        //                    },{
                        id: 'resumerate',
                        xtype: 'displayfield',
                        width: 60,
                        value: '= 1.00000'
                    },{
                        id: 'resumeratecurrency',
                        flex: 1,
                        xtype: 'displayfield',
                        value: config.app_currencycode
                    }]
                },{
                    layout:'column',
                    items:[{
                        columnWidth:.4,
                        layout: 'form',
                        items: [{
                            xtype: 'radiogroup',
                            id: 'isactive',
                            fieldLabel: '',
                            labelSeparator: '',
                            items: [{
                                boxLabel: bundle.getMsg('user.is.active'), 
                                id: 'percentage',
                                name: 'isactive', 
                                inputValue: true, 
                                checked: true
                            },{
                                boxLabel: bundle.getMsg('user.is.inactive'), 
                                id: 'fixed', 
                                name: 'isactive', 
                                inputValue: false
                            }]
                        }]
                    }]
                }]
            });

        },

        showWindow : function(animateTarget, hideApply, callback){
            var cancelFn = function(){
                window['CurrencyApp'].formPanel.getForm().reset();
            };
            window['CurrencyApp'].window = App.showWindow(bundle.getMsg('currency.window.title'), 420, 330, window['CurrencyApp'].formPanel, 
                function(button, eventObject, callback){
                    if(!button){
                        button = new Object;
                        button.id = window['CurrencyApp'].window.submitBtn.id;
                    }

                    var records = window['CurrencyApp'].gridPanel.getSelectionModel().getSelections();
                
                    //                    if (Ext.getCmp('resumeratecurrency').getValue() == Ext.getCmp('code').getValue())
                    //                        Ext.getCmp('changebtn').fireEvent('click');
							
                    window['CurrencyApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        params: {
                            id: records[0]?records[0].get('id'):''
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);
                            window['CurrencyApp'].store.load({
                                params:{
                                    start: window['CurrencyApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                            
                            submitFormSuccessful('CurrencyApp', form, action, button, !records[0], cancelFn, callback);
                        },
                        failure: loadFormFailed
                    });

                }, 
                function(){
                    cancelFn();
                    window['CurrencyApp'].window.hide();
                }, 
                animateTarget);
        },

        applySecurity : function(groups, permissions){
            window['CurrencyApp'].gridPanel.addBtn.setVisible(permissions.indexOf('managecurrency') != -1 || permissions.indexOf('managecurrencyadd') != -1);
            window['CurrencyApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('managecurrency') != -1 || permissions.indexOf('managecurrencyedit') != -1);
            window['CurrencyApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('managecurrency') != -1 || permissions.indexOf('managecurrencydelete') != -1);
        }
    }
}();

