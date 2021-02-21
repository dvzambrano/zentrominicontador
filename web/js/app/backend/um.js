/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package SGArqBase
 * @subpackage um
 * @author MSc. Donel Vázquez Zambrano
 * @version 1.0.0
 */

UmApp = function() {
    return {
        init : function(UmApp) {
			
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/um/request/method/load',
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
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/um/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) { 
                        alertNoRecords(records, bundle.getMsg('um.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.selectedEquivalencesComboStore = new Ext.data.Store({
                url: config.app_host + '/um/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });
			
            this.filters = new Ext.ux.grid.GridFilters({
                encode: true,
                local: false,
                menuFilterText: bundle.getMsg('app.languaje.find.label'),
                filters: [{
                    type: 'string',
                    dataIndex: 'name'
                },{
                    type: 'string',
                    dataIndex: 'comment'
                }]
            });

            this.infoTextItem = new Ext.Toolbar.TextItem('');
			
            this.gridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelUm',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('tag_orange'),
                title: config.app_showgridtitle ? bundle.getMsg("um.grid.title") : '',
                autoExpandColumn: 'ummaincolumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['UmApp'].gridPanel);
                    }
                },{
                    id:'help',
                    qtip: bundle.getMsg('app.layout.help'),
                    handler: function(button, eventObject) {
                        window.open('../uploads/docs/usermanual.pdf#page=22&zoom=auto,26,332');
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
                        var text = App.getFiltersText(window['UmApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['UmApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['UmApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['UmApp'].infoTextItem.getEl()).update('');
                    }
                },
				
                columns: [new Ext.grid.RowNumberer(),{
                    header: bundle.getMsg('um.field.name'), 
                    width: 60, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    id:'ummaincolumn', 
                    header: bundle.getMsg('um.field.comment'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'comment'
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
                            window['UmApp'].gridPanel.getSelectionModel().clearSelections();
                            window['UmApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
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
                            Ext.fly(Ext.getCmp('umEquivalenceInitialText').getEl()).update(String.format('&nbsp;&nbsp;'+bundle.getMsg('um.field.equivalence.description')+':&nbsp;', '').toLowerCase());
                            var record = window['UmApp'].gridPanel.getSelectionModel().getSelected();
                            if (record){
                                window['UmApp'].formPanel.getForm().loadRecord(record);
                                Ext.fly(Ext.getCmp('umEquivalenceInitialText').getEl()).update(String.format('&nbsp;&nbsp;'+bundle.getMsg('um.field.equivalence.description')+':&nbsp;', '"'+record.get('name')+'"').toLowerCase());
                                
                                if(record.get('UmUmRelation')){
                                    var equivalences = record.get('UmUmRelation');
                                    for(var i = 0; i < equivalences.length; i++){
                                        window['UmApp'].selectedEquivalencesComboStore.add(new Ext.data.Record({
                                            umid: equivalences[i].ToUm.id,
                                            umname: equivalences[i].ToUm.name,
                                            amount: equivalences[i].rate
                                        }));  
                                    }
                                }
                            }
                            else
                                window['UmApp'].formPanel.getForm().reset();
                            window['UmApp'].showWindow(button.getEl(), hideApply, callback);
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
                                            var records = window['UmApp'].gridPanel.getSelectionModel().getSelections();
											
                                            var array = new Array();
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/um/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        window['UmApp'].store.load({
                                                            params:{
                                                                start: window['UmApp'].gridPanel.getBottomToolbar().cursor
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
                            window['UmApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['UmApp'].infoTextItem.getEl()).update('');
                            window['UmApp'].gridPanel.getSelectionModel().clearSelections();
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
                if (!record.get('deleteable')) 
                    return 'row-italic';
            };
			
            this.formPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/um/request/method/save',
                frame:true,
                bodyStyle:'padding:5px 5px 0',
                keys: [formKeyMaping],
                items: [{
                    xtype:'textfield',
                    name: 'name',
                    fieldLabel: bundle.getMsg('um.field.name')+'<span style="color:red;"><sup>*</sup></span>', 
                    allowBlank: false, 
                    listeners: {
                        change: function(field, newValue, oldValue) {
                            Ext.fly(Ext.getCmp('umEquivalenceInitialText').getEl()).update(String.format('&nbsp;&nbsp;'+bundle.getMsg('um.field.equivalence.description')+':&nbsp;', '"'+newValue+'"').toLowerCase());
                        }
                    }, 
                    anchor:'-20'
                },{
                    xtype:'textarea',
                    name: 'comment',
                    fieldLabel: bundle.getMsg('um.field.comment'), 
                    anchor:'-20'
                },new Ext.grid.GridPanel({
                    id: 'gpUmEquivalences',
                    frame: true,
                    stripeRows: true,
                    height: 160,
                    anchor:'-20',
                    autoExpandColumn: 'ummaincolumn',
                    store: this.selectedEquivalencesComboStore,
                    sm: new Ext.grid.RowSelectionModel({
                        listeners: {
                            selectionchange: function(selectionModel) {
                                Ext.getCmp('btnRemoveUm').setDisabled(selectionModel.getCount() < 1);
                            }
                        }
                    }),	
                
                    columns: [{
                        header: bundle.getMsg('app.form.amount'), 
                        width: 70, 
                        sortable: true, 
                        dataIndex: 'amount'
                    },{
                        id:'ummaincolumn', 
                        header: bundle.getMsg('um.field.label'), 
                        width: 120, 
                        sortable: true, 
                        dataIndex: 'umname'
                    }],	
                
                    view: new Ext.grid.GridView({
                        markDirty: false,
                        forceFit:true
                    }),
                
                    tbar: [new Ext.Toolbar.TextItem({
                        id: 'umEquivalenceInitialText', 
                        text: '&nbsp;&nbsp;'+bundle.getMsg('um.field.equivalence.description')+':&nbsp;'
                    }),{
                        xtype: 'spinnerfield',
                        id: 'umEquivalenceAmount',
                        minValue: 0,
                        allowDecimals: true,
                        decimalPrecision: 2,
                        incrementValue: 0.5,
                        accelerate: true,
                        allowBlank: false, 
                        width: 80
                    },{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'
                    }, new Ext.form.ComboBox({
                        id: 'umEquivalenceSibling',
                        width: 100,
                        store: window['UmApp'].comboStore,
                        listeners: {
                            focus: function(combo) {
                                combo.getStore().load();
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
                        allowBlank: false, 
                        emptyText: bundle.getMsg('app.form.select')
                    }),'->',{
                        tooltip: bundle.getMsg('app.form.addrow'),
                        iconCls: Ext.ux.Icon('table_row_insert'),
                        listeners: {
                            click: function(button, eventObject) { 
                                var record = false;
                                if(Ext.getCmp('umEquivalenceAmount').isValid() && Ext.getCmp('umEquivalenceSibling').isValid()){
                                    var index = window['UmApp'].selectedEquivalencesComboStore.find('umid', Ext.getCmp('umEquivalenceSibling').getValue());
                                    if (index > -1){
                                        record = window['UmApp'].selectedEquivalencesComboStore.getAt(index);
                                        record.set('amount', Ext.getCmp('umEquivalenceAmount').getValue());
                                    }
                                    else{
                                        record = new Ext.data.Record({
                                            umname: Ext.getCmp('umEquivalenceSibling').getRawValue(),
                                            umid: Ext.getCmp('umEquivalenceSibling').getValue(),
                                            amount: Ext.getCmp('umEquivalenceAmount').getValue()
                                        });
                                        index = window['UmApp'].selectedEquivalencesComboStore.getCount();
                                    }
                                    if(record){
                                        window['UmApp'].selectedEquivalencesComboStore.remove(record);
                                        window['UmApp'].selectedEquivalencesComboStore.insert(index, record);  
                                    }
                                    
                                    Ext.getCmp('umEquivalenceSibling').reset();
                                    Ext.getCmp('umEquivalenceAmount').reset();
                                }
                            }
                        }
                    },{
                        tooltip: bundle.getMsg('app.form.deleterow'),
                        id: 'btnRemoveUm',
                        disabled: true,
                        iconCls: Ext.ux.Icon('table_row_delete'),
                        listeners: {
                            click: function(button, eventObject) {
                                var records = Ext.getCmp('gpUmEquivalences').getSelectionModel().getSelections();
                                window['UmApp'].selectedEquivalencesComboStore.remove(records);
                            }
                        }
                    }]
                })]
            });

        },

        showWindow : function(animateTarget, hideApply, callback){
            var cancelFn = function(){
                window['UmApp'].formPanel.getForm().reset();
                window['UmApp'].selectedEquivalencesComboStore.removeAll();
                    
                Ext.getCmp('umEquivalenceSibling').reset();
                Ext.getCmp('umEquivalenceAmount').reset();
            };
                
            window['UmApp'].window = App.showWindow(bundle.getMsg('um.window.title'), 500, 400, window['UmApp'].formPanel, 
                function(button){
                    if(!button){
                        button = new Object;
                        button.id = window['UmApp'].window.submitBtn.id;
                    }

                    var records = window['UmApp'].gridPanel.getSelectionModel().getSelections();
                    
                    var equivalences = new Array();
                    window['UmApp'].selectedEquivalencesComboStore.each(function(record){
                        equivalences.push(record.data);
                    });
							
                    window['UmApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        params: {
                            id: records[0]?records[0].get('id'):'',
                            equivalences: Ext.encode(equivalences)
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);
                            window['UmApp'].store.load({
                                params:{
                                    start: window['UmApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                            
                            submitFormSuccessful('UmApp', form, action, button, !records[0], cancelFn, callback);
                        },
                        failure: loadFormFailed
                    });

                }, 
                function(){
                    cancelFn();
                    window['UmApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },

        applySecurity : function(groups, permissions){
            window['UmApp'].gridPanel.addBtn.setVisible(permissions.indexOf('manageum') != -1 || permissions.indexOf('manageumadd') != -1);
            window['UmApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('manageum') != -1 || permissions.indexOf('manageumedit') != -1);
            window['UmApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('manageum') != -1 || permissions.indexOf('manageumdelete') != -1);
        }
    }
}();

