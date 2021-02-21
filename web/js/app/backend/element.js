/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package SGArqBase
 * @subpackage element
 * @author MSc. Donel Vázquez Zambrano
 * @version 1.0.0
 */

ElementApp = function() {
    return {
        init : function(ElementApp) {
			
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/element/request/method/load',
                baseParams:{
                    component: 'grid',
                    entityid: config.app_entityid,
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

            this.comboStore = new Ext.data.GroupingStore({
                url: config.app_host + '/element/request/method/load',
                baseParams:{
                    entityid: config.app_entityid,
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: function(store, records) { 
                        window['UmApp'].comboStore.load({
                            callback: function(umrecords){
                                for (var i=0; i<records.length; i++){
                                    var obj = window['ElementApp'].decodeDetails(records[i], umrecords);
                                    records[i].set('details', obj.details);
                                    records[i].set('amounts', obj);
                                }
                        
                                alertNoRecords(records);
                                if(config.app_showmessageonstoreloadsuccessful)
                                    loadStoreSuccessful(store, records);
                            }
                        });
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });

            this.selectedEquivalencesComboStore = new Ext.data.Store({
                url: config.app_host + '/element/request/method/load',
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
                id: 'gridPanelElement',
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('tag_orange'),
                title: config.app_showgridtitle ? bundle.getMsg("element.grid.title") : '',
                autoExpandColumn: 'elementmaincolumn',
                store: this.store,
                loadMask: true,
                tools: [{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['ElementApp'].gridPanel);
                    }
                },{
                    id:'help',
                    qtip: bundle.getMsg('app.layout.help'),
                    handler: function(button, eventObject) {
                        window.open('../uploads/docs/usermanual.pdf#page=24&zoom=auto,26,310');
                    }
                }],
                keys: [panelKeysMap],

                listeners: {
                    activate: function(gridpanel){
                        gridpanel.getStore().baseParams.entityid = config.app_entityid;
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
                        var text = App.getFiltersText(window['ElementApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['ElementApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['ElementApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['ElementApp'].infoTextItem.getEl()).update('');
                    }
                },
				
                columns: [new Ext.grid.RowNumberer(),{
                    header: bundle.getMsg('element.field.name'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    id:'elementmaincolumn', 
                    header: bundle.getMsg('element.field.comment'), 
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
                            window['ElementApp'].gridPanel.getSelectionModel().clearSelections();
                            window['ElementApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
                        }
                    }
                },{
                    ref: '../updateBtn',
                    text: bundle.getMsg('app.form.info'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('information'),
                    listeners: {
                        click: function(button, eventObject, hideApply, callback) {
                            var finalFn = function(){
                                Ext.fly(Ext.getCmp('elementEquivalenceInitialText').getEl()).update(String.format('&nbsp;&nbsp;'+bundle.getMsg('element.field.equivalence.description')+':&nbsp;', '').toLowerCase());
                                var record = window['ElementApp'].gridPanel.getSelectionModel().getSelected();
                                if (record){
                                    window['ElementApp'].formPanel.getForm().loadRecord(record);
                                
                                    Ext.fly(Ext.getCmp('elementEquivalenceInitialText').getEl()).update(String.format('&nbsp;&nbsp;'+bundle.getMsg('element.field.equivalence.description')+':&nbsp;', record.get('name')).toLowerCase());
                                
                                    if(record.get('ElementElementRelation')){
                                        var equivalences = record.get('ElementElementRelation');
                                        for(var i = 0; i < equivalences.length; i++){
                                            window['ElementApp'].selectedEquivalencesComboStore.add(new Ext.data.Record({
                                                elementid: equivalences[i].ToElement.id,
                                                umname: equivalences[i].ToElement.name,
                                                amount: equivalences[i].rate
                                            }));  
                                        }
                                    }
                                }
                                else
                                    window['ElementApp'].formPanel.getForm().reset();
                                window['ElementApp'].showWindow(button.getEl());
                            };
                            syncLoad([
                                window['ElementApp'].formPanel.tabPanel.generalPanel.umCombo.store
                                ], finalFn);
                                
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
                                            var records = window['ElementApp'].gridPanel.getSelectionModel().getSelections();
											
                                            var array = new Array();
                                            for (var i=0; i<records.length; i++)
                                                array.push(records[i].get('id'));
												
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/element/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    var object = Ext.decode(response.responseText);
                                                    if(object.success){
                                                        window['ElementApp'].store.load({
                                                            params:{
                                                                start: window['ElementApp'].gridPanel.getBottomToolbar().cursor
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
                            window['ElementApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['ElementApp'].infoTextItem.getEl()).update('');
                            window['ElementApp'].gridPanel.getSelectionModel().clearSelections();
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
                url: config.app_host + '/element/request/method/save',
                layout:'fit',
                border:false,					        
                keys: [formKeyMaping],
                items: [new Ext.TabPanel({
                    ref: 'tabPanel',
                    deferredRender: false,
                    defaults:{
                        autoHeight:false, 
                        border:false
                    }, 			
                    activeTab: 0,
                    border:false,
                    items:[{
                        ref: 'generalPanel',
                        title: bundle.getMsg('app.form.generaldata'),
                        iconCls: Ext.ux.Icon('application_view_list'),
                        frame:true,	
                        border:false,	
                        layout:'form',
                        bodyStyle:'padding:5px',
                        listeners: {
                            activate: function() { 
                                if(permissions.indexOf('manageum') == -1 && permissions.indexOf('manageumadd') == -1)
                                    window['UmApp'].formPanel.tabPanel.generalPanel.umCombo.getTrigger(1).hide();
                            }
                        },
                        items: [{
                            layout:'column',
                            items:[{
                                columnWidth:.7,
                                layout: 'form',
                                items: [{
                                    xtype:'textfield',
                                    name: 'name',
                                    fieldLabel: bundle.getMsg('element.field.name')+'<span style="color:red;"><sup>*</sup></span>', 
                                    anchor:'-20',
                                    allowBlank: false,
                                    listeners: {
                                        change: function(field, newValue, oldValue) {
                                            Ext.fly(Ext.getCmp('elementEquivalenceInitialText').getEl()).update(String.format('&nbsp;&nbsp;'+bundle.getMsg('element.field.equivalence.description')+':&nbsp;', newValue).toLowerCase());
                                        }
                                    }
                                }]
                            },{
                                columnWidth:.3,
                                layout: 'form',
                                items: [new Ext.form.ClearableCombo({
                                    id: 'elementum',
                                    name: 'umid',
                                    ref: '../../umCombo',
                                    fieldLabel: bundle.getMsg('um.field.label')+'<span style="color:red;"><sup>*</sup></span>',
                                    anchor: '-20',
                                    store: window['UmApp'].comboStore,
                                    valueField: 'id', 
                                    displayField: 'name',
                                    tpl: '<tpl for="."><div ext:qtip="{name}:{comment}" class="x-combo-list-item">{name}</div></tpl>',
                                    typeAhead: true,
                                    forceSelection: true,
                                    mode: 'local',
                                    triggerAction: 'all',
                                    selectOnFocus:true,
                                    emptyText: bundle.getMsg('app.form.select'),
                                    allowBlank: false,
                                    triggerConfig: {
                                        tag:'span', 
                                        cls:'x-form-twin-triggers', 
                                        style:'padding-right:2px',
                                        cn:[{
                                            tag: "img", 
                                            src: Ext.BLANK_IMAGE_URL, 
                                            cls: "x-form-trigger"
                                        },{
                                            tag: "img", 
                                            src: Ext.BLANK_IMAGE_URL, 
                                            cls: "x-form-trigger x-form-plus-trigger"
                                        }]
                                    },
                                    listeners: {
                                        focus: function(combo) {
                                            if(!combo.readOnly && !combo.disabled)
                                                combo.getStore().load();
                                        }
                                    },
                                    onTrigger2Click: function(){ 
                                        var obj = new Object;
                                        obj.params = [window['ElementApp'].formPanel.tabPanel.generalPanel.umCombo];
                                        obj.fn = function(params){
                                            var cmp = params[0];
                                            var obj = params[1];
                                            var mask = new Ext.LoadMask(window['UmApp'].window.getEl(), {
                                                msg: bundle.getMsg('app.layout.loading')+'...'
                                            });
                                            mask.show();
                                            cmp.store.load({
                                                callback: function(records, options, success){
                                                    var record = cmp.getStore().getAt(cmp.getStore().find('id',obj.data.id, 0, true, true));								 
                                                    if(record)
                                                        cmp.setValue(obj.data.id);
                                                    mask.hide();
                                                }
                                            });
                                        };
                                        window['UmApp'].showWindow(window['UmApp'].window.getEl(), true, obj);
                                    }
                                })
                                ]
                            }]
                        },{
                            xtype:'textarea',
                            name: 'comment',
                            fieldLabel: bundle.getMsg('element.field.comment'), 
                            anchor:'-20'
                        }]
                    }, new Ext.grid.GridPanel({
                        title: bundle.getMsg('element.field.equivalence'),
                        iconCls: Ext.ux.Icon('chart_line'),
                        stripeRows: true,
                        id: 'gpElementEquivalences',
                        autoExpandColumn: 'elementequivalencemaincolumn',
                        store: this.selectedEquivalencesComboStore,
                        sm: new Ext.grid.RowSelectionModel({
                            listeners: {
                                selectionchange: function(selectionModel) {
                                    Ext.getCmp('btnRemoveEquivalence').setDisabled(selectionModel.getCount() < 1);
                                }
                            }
                        }),	
                
                        columns: [{
                            header: bundle.getMsg('app.form.amount'), 
                            width: 40, 
                            sortable: true, 
                            dataIndex: 'amount'
                        },{
                            id:'elementequivalencemaincolumn', 
                            header: bundle.getMsg('element.field.label'), 
                            width: 120, 
                            sortable: true, 
                            dataIndex: 'umname'
                        }],	
                
                        view: new Ext.grid.GridView({
                            markDirty: false,
                            forceFit:true
                        }),
                
                        tbar: [new Ext.Toolbar.TextItem({
                            id: 'elementEquivalenceInitialText', 
                            text: '&nbsp;&nbsp;'+bundle.getMsg('element.field.equivalence.description')+':&nbsp;'
                        }),{
                            xtype: 'spinnerfield',
                            id: 'elementEquivalenceAmount',
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
                            id: 'elementEquivalenceSibling',
                            width: 180,
                            store: window['ElementApp'].comboStore,
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
                                    if(Ext.getCmp('elementEquivalenceAmount').isValid() && Ext.getCmp('elementEquivalenceSibling').isValid()){
                                        var index = window['ElementApp'].selectedEquivalencesComboStore.find('elementid', Ext.getCmp('elementEquivalenceSibling').getValue());
                                        if (index > -1){
                                            record = window['ElementApp'].selectedEquivalencesComboStore.getAt(index);
                                            record.set('amount', Ext.getCmp('elementEquivalenceAmount').getValue());
                                        }
                                        else{
                                            record = new Ext.data.Record({
                                                umname: Ext.getCmp('elementEquivalenceSibling').getRawValue(),
                                                elementid: Ext.getCmp('elementEquivalenceSibling').getValue(),
                                                amount: Ext.getCmp('elementEquivalenceAmount').getValue()
                                            });
                                            index = window['ElementApp'].selectedEquivalencesComboStore.getCount();
                                        }
                                        if(record){
                                            window['ElementApp'].selectedEquivalencesComboStore.remove(record);
                                            window['ElementApp'].selectedEquivalencesComboStore.insert(index, record);  
                                        }
                                    
                                        Ext.getCmp('elementEquivalenceSibling').reset();
                                        Ext.getCmp('elementEquivalenceAmount').reset();
                                    }
                                }
                            }
                        },{
                            tooltip: bundle.getMsg('app.form.deleterow'),
                            id: 'btnRemoveEquivalence',
                            disabled: true,
                            iconCls: Ext.ux.Icon('table_row_delete'),
                            listeners: {
                                click: function(button, eventObject) {
                                    var records = Ext.getCmp('gpElementEquivalences').getSelectionModel().getSelections();
                                    window['ElementApp'].selectedEquivalencesComboStore.remove(records);
                                }
                            }
                        }]
                    })]
                })]
            });

        },

        showWindow : function(animateTarget, hideApply, callback){
            var cancelFn = function(){
                window['ElementApp'].formPanel.getForm().reset();
                window['ElementApp'].selectedEquivalencesComboStore.removeAll();
                    
                Ext.getCmp('elementEquivalenceSibling').reset();
                Ext.getCmp('elementEquivalenceAmount').reset();
            };
                
            window['ElementApp'].window = App.showWindow(bundle.getMsg('element.window.title'), 570, 260, window['ElementApp'].formPanel, 
                function(button){
                    if(!button){
                        button = new Object;
                        button.id = window['ElementApp'].window.submitBtn.id;
                    }
                    
                    var record = window['ElementApp'].gridPanel.getSelectionModel().getSelected();
                    
                    var equivalences = new Array();
                    window['ElementApp'].selectedEquivalencesComboStore.each(function(record){
                        equivalences.push(record.data);
                    });
							
                    window['ElementApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        params: {
                            id: record ? record.get('id') : '',
                            um_id: Ext.getCmp('elementum').getValue(),
                            equivalences: Ext.encode(equivalences),
                            entityid: config.multientityapp ? config.app_entityid : ''
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);
                            window['ElementApp'].store.load({
                                params:{
                                    start: window['ElementApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                            
                            submitFormSuccessful('ElementApp', form, action, button, !record, cancelFn, callback);
                        },
                        failure: loadFormFailed
                    });

                }, 
                function(){
                    cancelFn();
                    window['ElementApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },
        
        decodeDetails : function(element, records){ 
            var obj = new Object;
            obj.ids = new Array();
            obj.names = new Array();
            obj.values = new Array();
            
            if (!element || !element.get('Accounts') || element.get('Accounts').length < 1){
                obj.details = '<tr>\
				<td tabindex="0" style="width: 100%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
					<div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + String.format(bundle.getMsg('app.form.bbar.emptymsg'), bundle.getMsg('app.form.elements')) + '</div>\
				</td>\
			</tr>';
                return obj;
            }
            
            obj.details = '<tr>\
				<td tabindex="0" style="width: 50%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
					<div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + bundle.getMsg('um.field.label') + '<hr/></div>\
				</td>\
                                <td tabindex="0" style="width: 50%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
					<div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + bundle.getMsg('app.form.amount') + '<hr/></div>\
				</td>\
			</tr>';
            
            if(records && records.length)
                for (var i = 0; i < records.length; i++)
                    for (var j = 0; j < element.get('Accounts').length; j++)
                        for (var k = 0; k < element.get('Accounts')[j].Transactions.length; k++){
                            var transaction = element.get('Accounts')[j].Transactions[k];
                            if(transaction.umid == records[i].id){
                                var v = parseFloat(transaction.amount);
                                if(transaction.credit && parseFloat(transaction.credit) > 0)
                                    v = v* (-1);
                                
                                if(obj.ids.indexOf(records[i].get('id'))>-1)
                                    obj.values[obj.ids.indexOf(records[i].get('id'))] += v;
                                else{
                                    obj.ids.push(records[i].get('id'));
                                    obj.names.push(records[i].get('name'));
                                    obj.values.push(v);
                                }
                                
                                if (v < 0) {
                                    v = parseFloat(-1*v).toFixed(2);
                                    v = '<b><span style="color:red;">' + v + '</span></b>';
                                }
                                else{   
                                    v = parseFloat(v).toFixed(2);
                                    v = '<b><span style="color:green;">' + v + '</span></b>';
                                } 
                            }
                        }
                        
                        
            for (i = 0; i < obj.names.length; i++)     
                obj.details += '<tr>\
                                    <td tabindex="0" style="width: 50%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                                            <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + obj.names[i] + '</div>\
                                    </td>\
                                    <td tabindex="0" style="width: 50%;" class="x-grid3-col x-grid3-cell x-grid3-td-1 ">\
                                            <div unselectable="on" class="x-grid3-cell-inner x-grid3-col-1">' + obj.values[i] + '</div>\
                                    </td>\
                                </tr>'; 
            
            return obj;
        },
        
        applySecurity : function(groups, permissions){
            window['ElementApp'].gridPanel.addBtn.setVisible(permissions.indexOf('manageelement') != -1 || permissions.indexOf('manageelementadd') != -1);
            window['ElementApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('manageelement') != -1 || permissions.indexOf('manageelementedit') != -1);
            window['ElementApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('manageelement') != -1 || permissions.indexOf('manageelementdelete') != -1);
        }
    }
}();

