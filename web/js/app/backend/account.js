/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage account
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */

AccountApp = function() {
    return {
        init : function(AccountApp) {
            
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/account/request/method/load',
                baseParams:{
                    component: 'grid',
                    entityid: config.app_entityid,
                    start: 0
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    beforeload: beforeloadStore,
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(store, records) {           
                        alertNoRecords(records);
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });
            
            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/account/request/method/load',
                baseParams:{
                    entityid: config.app_entityid,
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    beforeload: beforeloadStore,
                    load: function(store, records) {
                        for(var i = 0; i < records.length; i++){
                            records[i].set('icontip', '');
                            if(records[i].get('customicon') && records[i].get('customicon').icon != '' && records[i].get('customicon').icon != 'money_open.png')
                                records[i].set('icontip', '<img src="images/icons/famfamfamflag/'+records[i].get('customicon')+'" />');
                            else
                                records[i].set('icontip', '<img src="images/icons/famfamfam/money_open.png" />');
                        }
                        alertNoRecords(records, bundle.getMsg('account.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });  
            
            this.selectedClosureConfigComboStore = new Ext.data.Store({
                url: config.app_host + '/comprobant/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });
            
            this.conditionComboStore = new Ext.data.ArrayStore({
                fields: ['name', 'nick'],
                data : [
                [bundle.getMsg('account.action.closure.config.condition.balanceplus'), 'balanceplus'],
                [bundle.getMsg('account.action.closure.config.condition.balanceminus'), 'balanceminus']
                ]
            });
            
            this.filters = new Ext.ux.grid.GridFilters({
                encode: true,
                account: false,
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

            this.selectedElementsComboStore = new Ext.data.Store({
                url: config.app_host + '/account/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
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
            
            this.comprobantsStore = new Ext.data.GroupingStore({
                url: config.app_host + '/comprobant/request/method/load',
                baseParams:{
                    component: 'grid',                    
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
            
            this.comprobantGridPanel = new Ext.grid.GridPanel({
                region:'center',
                layout: 'fit', 
                iconCls: Ext.ux.Icon('page_copy'),
                title: config.app_showgridtitle ? bundle.getMsg("comprobant.grid.title") : '',
                autoExpandColumn: 'accountcomprobantcolname',
                store: this.comprobantsStore,
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
                    render: function(gridpanel){
                        var preview = window['AccountApp'].comprobantGridPanel;
                        preview.ownerCt.hide();
                        preview.ownerCt.ownerCt.doLayout();
                    }
                },
				
                columns: [this.expander,{
                    xtype: 'datecolumn', 
                    format: Date.patterns.FullDateTime, 
                    header: bundle.getMsg('comprobant.field.creationdate'), 
                    width: 80, 
                    dataIndex: 'creationdate'
                },{
                    id:'accountcomprobantcolname', 
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
                tbar:['->',{
                    ref: '../expandBtn',
                    iconCls: Ext.ux.Icon('expand-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.expandall'),
                    listeners: {
                        click: function(store, records, options) {
                            for (var i = 0; i < window['AccountApp'].comprobantsStore.getCount(); i++) {
                                window['AccountApp'].expander.expandRow(i);
                            }
                        }
                    }
                },{
                    ref: '../collapseBtn',
                    iconCls: Ext.ux.Icon('collapse-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.collapseall'),
                    listeners: {
                        click: function(store, records, options) {
                            for (var i = 0; i < window['AccountApp'].comprobantsStore.getCount(); i++) {
                                window['AccountApp'].expander.collapseRow(i);
                            }
                        }
                    }
                }],
				
                bbar: new Ext.PagingToolbar({
                    pageSize: parseInt(config.app_elementsongrid),
                    store: this.comprobantsStore,
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
            
            this.gridPanel = new Ext.ux.tree.TreeGrid({
                //                id: 'gridPanelAccount',
                rootVisible:false,
                iconCls: Ext.ux.Icon('money'),
                
                region:'center',
                title: config.app_showgridtitle ? bundle.getMsg("account.grid.title") : '',
                autoExpandColumn: 'accountmaincolumn',
                enableDD: false,
                useArrows: false,
                lines: true,
                containerScroll: true,
                animate: true,
                columnsText: bundle.getMsg('app.layout.columns'),
                maskConfig: {
                    msg: bundle.getMsg("app.layout.loading")
                },
                keys: [panelKeysMap],
                
                view: new Ext.grid.GroupingView(),
                
                plugins: [this.filters],
                
                tools:[{
                    id:'refresh',
                    qtip: bundle.getMsg('app.languaje.refresh.label'),
                    handler:function(event,toolEl,panel,tc){
                        window['AccountApp'].gridPanel.getBottomToolbar().doRefresh();
                    }
                },{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['AccountApp'].gridPanel);
                    }
                },{
                    id:'help',
                    qtip: bundle.getMsg('app.layout.help'),
                    handler: function(button, eventObject) {
                    //window.open('../uploads/docs/usermanual.pdf#page=26&zoom=auto,26,425');
                    //                        window.open('../uploads/tutorial/05 Gestion de Accountes.html');
                    }
                }],
                
                columns: [{
                    id:'accountmaincolumn', 
                    header: bundle.getMsg('app.form.name'), 
                    width: 250, 
                    sortable: true, 
                    dataIndex: 'code',
                    tpl: new Ext.XTemplate('{comment:this.renderValue}', {
                        renderValue: function(comment, account){
                            if(account.code.length==32 && account.code.indexOf('.')==-1)
                                return account.name;
                            
                            var code = account.code.substring(account.code.indexOf('->')+2,account.code.length);
                            return code + ' ' + account.name;
                        }
                    })
                },{
                    header: bundle.getMsg('app.form.comment'), 
                    width: 500, 
                    sortable: true, 
                    dataIndex: 'comment',
                    tpl: new Ext.XTemplate('{comment:this.renderValue}', {
                        renderValue: formatNull
                    })
                }],
                
                selModel: new Ext.tree.MultiSelectionModel({
                    listeners: {
                        selectionchange : function(selectionModel, nodes) {
                            var obj = App.selectionChange(selectionModel);
                            
                            var virtual = true;
                            for(var i = 0; i < nodes.length; i++)
                                if(!nodes[i].attributes.virtual){
                                    virtual = false;
                                    break;
                                }
                            
                            window['AccountApp'].gridPanel.splitBtn.setDisabled(nodes.length < 1 || virtual);   
                            window['AccountApp'].gridPanel.removeBtn.setDisabled(!obj.deleteable || nodes.length < 1); 
                            window['AccountApp'].gridPanel.updateBtn.setDisabled(selectionModel.getSelectedNodes().length != 1);
                            window['AccountApp'].gridPanel.comprobantsBtn.setDisabled(selectionModel.getSelectedNodes().length != 1 || !obj.allleaf);
                            
                            window['AccountApp'].gridPanel.consolidateBtn.setDisabled(selectionModel.getSelectedNodes().length != 1);    
                            
                            window['AccountApp'].gridPanel.reportBtn.menu.items.items[0].setDisabled(window['AccountApp'].gridPanel.consolidateBtn.disabled);
                            window['AccountApp'].gridPanel.reportBtn.menu.items.items[1].setDisabled(window['AccountApp'].gridPanel.consolidateBtn.disabled);
    
                            if(obj.allleaf && nodes.length == 1){
                                window['AccountApp'].comprobantGridPanel.setTitle(String.format(bundle.getMsg("account.comprobant.grid.title"), nodes[0].attributes.fancytext));
                                window['AccountApp'].comprobantGridPanel.getStore().load({
                                    params:{
                                        accountid: nodes[0].id
                                    }
                                });
                                
                                for (i = 0; i < window['AccountApp'].comprobantGridPanel.getStore().getCount(); i++) 
                                    window['AccountApp'].expander.collapseRow(i);
                                
                                
                                window['AccountApp'].comprobantGridPanel.getSelectionModel().clearSelections();
                                window['AccountApp'].comprobantGridPanel.setTitle(String.format(bundle.getMsg("account.transaction.grid.title"), nodes[0].attributes.name));
                                window['AccountApp'].comprobantGridPanel.getStore().load({
                                    params:{
                                        accountid: nodes[0].attributes.id,
                                        fromdate: Ext.getCmp('accounttransactionfromdate').getValue() ? Ext.getCmp('accounttransactionfromdate').getValue().format('d/m/Y') : '',
                                        todate: Ext.getCmp('accounttransactiontodate').getValue() ? Ext.getCmp('accounttransactiontodate').getValue().format('d/m/Y') : ''
                                    }
                                });
                            }
                            else
                                window['AccountApp'].comprobantGridPanel.getStore().removeAll();
    
    
                            if(nodes.length < 1 || !obj.allleaf)            
                                window['AccountApp'].movePreview.defer(1, this, [Ext.getCmp('accountcomprobanthide'), true]);
                        }   
                    }
                }),
                
                root: new Ext.tree.AsyncTreeNode({
                    text: 'root',
                    id:'NULL'
                }),
                
                listeners: {
                    click: function(node){
                        App.selectionChange(node.getOwnerTree().getSelectionModel());
                    },
                    beforedblclick: function(){
                        window['AccountApp'].gridPanel.updateBtn.fireEvent('click', window['AccountApp'].gridPanel.updateBtn);
                        return false;
                    },
                    beforeexpandnode: function(node, deep, anim){
                        node.getOwnerTree().collapseBtn.setDisabled(false);
                    },
                    beforecollapsenode: function(node, deep, anim){
                        node.getOwnerTree().expandBtn.setDisabled(false);
                    },
                    filterupdate: function(){
                        var text = App.getFiltersText(window['AccountApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['AccountApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['AccountApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['AccountApp'].infoTextItem.getEl()).update('');
                    }
                },
                
                loader: new Ext.tree.TreeLoader({
                    baseParams: {
                        component: 'tree',
                        start: 0
                    },
                    dataUrl: config.app_host + '/account/request/method/load',
                    listeners: {
                        beforeload: beforeloadStore,
                        load: window['ComprobantApp'].renderNode
                    }
                }),
                
                tbar: [new Ext.Toolbar.SplitButton({
                    ref: '../addBtn',
                    text: bundle.getMsg('app.form.add'),
                    iconCls: Ext.ux.Icon('add'),
                    handler: function(button, eventObject, hideApply, callback) {
                        window['AccountApp'].gridPanel.getSelectionModel().clearSelections();
                        
                        window['AccountApp'].gridPanel.getSelectionModel().fireEvent('selectionchange', window['AccountApp'].gridPanel.getSelectionModel(), window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes());
                        
                        window['AccountApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
                    },
                    menu : {
                        items: [{
                            iconCls: Ext.ux.Icon('page_excel'),
                            text: bundle.getMsg('account.action.addfromfile'),
                            handler: function(){
                                window['AccountApp'].showImportForm(false, 'web/uploads/import/account', function(url){
                                    var msg=App.mask.msg;
                                    App.mask.msg=bundle.getMsg('app.layout.loading');
                                    App.mask.show();
                                        
                                    window['ExplorerApp'].readFile({
                                        id:'web/' + url
                                    }, '', function(content){
                                        var files = content[0];
                                        files.shift();
                                        var total = files.length;
                                        var count = 0;

                                        App.mask.hide();
                                        App.mask.msg = msg;

                                        var processFile = function(files, nextFn) {
                                            var start = (files.length-total)*-1;
                                            if(files && files.length>0){
                                                var currentfile = Ext.util.Format.ellipsis(files[0][1], 30);

                                                Ext.MessageBox.progress(bundle.getMsg('app.msg.wait.title'), String.format(bundle.getMsg('account.action.import.description'), start+1, total) + '...');
                                                Ext.MessageBox.updateProgress(start/total, currentfile);
                                                
                                                
                                                new Ext.data.Connection().request({
                                                    url: config.app_host + '/account/request/method/import',
                                                    method: 'POST',
                                                    params: { 
                                                        code: files[0][0],
                                                        name: files[0][1],
                                                        accountnature: files[0][2],
                                                        comment: files[0][3],
                                                        entityid: config.multientityapp ? config.app_entityid : ''
                                                    },
                                                    callback : function(options, success, response) {
                                                        var object = Ext.decode(response.responseText);
                                                        if(object.success)
                                                            count++;
                                                        files.splice(0,1);
                                                        nextFn(files, processFile);
                                                    }
                                                });
                                            }
                                            else{
                                                Ext.MessageBox.hide(); 
                                                Ext.Msg.show({
                                                    title:bundle.getMsg('app.msg.info.title'),
                                                    msg: String.format(bundle.getMsg('account.action.import.done'), count),
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.MessageBox.INFO
                                                });
                                                
                                                resetTree(window['AccountApp'].gridPanel, false, false);
                                            }
                                        };

                                        processFile(files, processFile);
                                                
                                    }, true, 'array');
                                });
                            }
                        }]
                    }
                }),{
                    ref: '../updateBtn',
                    text: bundle.getMsg('app.form.info'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('information'),
                    listeners: {
                        click: function(button, eventObject, hideApply, callback) {
                            App.mask.show();
                            var record = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                            if (record.length==1){
                                var dr = new Ext.data.Record({
                                    code: record[0].attributes.manualcode ? record[0].attributes.code : '',
                                    name: record[0].attributes.name,
                                    comment: record[0].attributes.comment,
                                    manualcode: record[0].attributes.manualcode,
                                    parent: record[0].attributes.Account && record[0].attributes.Account.name ? record[0].attributes.Account.name : '',
                                    icon: record[0].attributes.customicon && record[0].attributes.customicon != 'ppa' ? record[0].attributes.customicon : '',
                                    parentid: record[0].attributes.Account ? record[0].attributes.Account.name : ''
                                });
                                
                                if (!window['AccountApp'].parentRecord){
                                    window['AccountApp'].parentRecord = new Object;
                                    window['AccountApp'].parentRecord.data = new Object;
                                }
                                window['AccountApp'].parentRecord.id = record[0].attributes.parentid;
                                window['AccountApp'].parentRecord.data.path = record[0].parentNode.getPath();
                                window['AccountApp'].formPanel.getForm().loadRecord(dr);
                                
                                var val = record[0].attributes.nature;
                                Ext.getCmp('accountnature').setValue('accountcredit', val);
                                Ext.getCmp('accountnature').setValue('accountdebit', !val);
                                
                                if(record[0].attributes.elements){
                                    var elements = record[0].attributes.elements;
                                    for(var i = 0; i < elements.length; i++){
                                        window['AccountApp'].selectedElementsComboStore.add(new Ext.data.Record({
                                            id: elements[i].id,
                                            name: elements[i].name,
                                            comment: elements[i].comment
                                        }));  
                                    }
                                }
                            }
                            window['AccountApp'].showWindow(button.getEl(), hideApply, callback);
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
                                            var nodes = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                                        
                                            var array = new Array();                                
                                            for (var i=0; i<nodes.length; i++)
                                                array.push(nodes[i].id);
                                        
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/account/request/method/delete',
                                                params: {
                                                    ids: Ext.encode(array)
                                                },
                                                failure: requestFailed,
                                                success: requestSuccessful,
                                                callback : function(options, success, response) {
                                                    for (var i=0; i<nodes.length; i++){
                                                        nodes[i].unselect();
                                                        var el = Ext.fly(nodes[i].ui.elNode);
                                                        if(el)
                                                            el.ghost('l', {
                                                                callback: nodes[i].remove, 
                                                                scope: nodes[i], 
                                                                duration: .4
                                                            });
                                                    }
                                                    if(callback){
                                                        if(callback.fn)
                                                            callback.fn(callback.params);
                                                        else
                                                            callback();
                                                    }
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
                }, '-',{
                    ref: '../splitBtn',
                    text: bundle.getMsg('account.action.split'),
                    iconCls: Ext.ux.Icon('chart_organisation'),
                    disabled: true,
                    menu : {
                        items: [{
                            text: bundle.getMsg('costcenter.tab.label'),
                            listeners: {
                                click: function(store, records, options) {
                                    App.mask.show();
                                    var nodes = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                                    var array = new Array();                                    
                                    for(var i = 0; i < nodes.length; i++)                                        
                                        array.push(nodes[i].id);
                                    
                                    new Ext.data.Connection().request({
                                        url: config.app_host + '/account/request/method/splitcostcenter',
                                        params: {
                                            ids: Ext.encode(array)
                                        },
                                        failure: requestFailed,
                                        success: requestSuccessful,
                                        callback : function(options, success, response) {
                                            for(var i = 0; i < nodes.length; i++) {
                                                resetTree(window['AccountApp'].gridPanel, nodes[i], nodes[i].parentNode);
                                            }
                                            App.mask.hide();
                                        }
                                    });
                                        
                                }
                            }
                        },{
                            text: bundle.getMsg('element.tab.label'),
                            listeners: {
                                click: function(store, records, options) {
                                    App.mask.show();
                                    var nodes = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                                    var array = new Array();                                    
                                    for(var i = 0; i < nodes.length; i++)                                        
                                        array.push(nodes[i].id);
                                    
                                    new Ext.data.Connection().request({
                                        url: config.app_host + '/account/request/method/splitelement',
                                        params: {
                                            ids: Ext.encode(array)
                                        },
                                        failure: requestFailed,
                                        success: requestSuccessful,
                                        callback : function(options, success, response) {
                                            for(var i = 0; i < nodes.length; i++) {
                                                resetTree(window['AccountApp'].gridPanel, nodes[i], nodes[i].parentNode);
                                            }
                                            App.mask.hide();
                                        }
                                    });
                                        
                                }
                            }
                        }]
                    }
                }, {
                    ref: '../comprobantsBtn',
                    disabled: true,
                    split: true,
                    text: bundle.getMsg('account.action.comprobant'),
                    tooltip: {
                        title: bundle.getMsg('account.action.comprobant'),
                        text: bundle.getMsg('account.action.comprobant.comment')
                    },
                    iconCls: Ext.ux.Icon('preview-hide', 'myicons'),
                    handler: window['AccountApp'].movePreview.createDelegate(this, []),
                    menu:{
                        id:'account-comprobants-menu',
                        cls:'account-comprobants-menu',
                        width:100,
                        items: [{
                            text: bundle.getMsg('account.action.comprobant.right'),
                            checked: false,
                            group: 'rp-group',
                            checkHandler: window['AccountApp'].movePreview,
                            scope: this,
                            iconCls: Ext.ux.Icon('preview-right', 'myicons')
                        },{
                            id: 'accountcomprobantbottom',
                            text: bundle.getMsg('account.action.comprobant.bottom'),
                            checked: false,
                            group: 'rp-group',
                            checkHandler: window['AccountApp'].movePreview,
                            scope: this,
                            iconCls: Ext.ux.Icon('preview-bottom', 'myicons')
                        },{
                            id: 'accountcomprobanthide',
                            text: bundle.getMsg('account.action.comprobant.hide'),
                            checked: true,
                            group: 'rp-group',
                            checkHandler: window['AccountApp'].movePreview,
                            scope: this,
                            iconCls: Ext.ux.Icon('preview-hide', 'myicons')
                        }]
                    }
                },{
                    ref: '../closureBtn',
                    text: bundle.getMsg('account.action.closure'),
                    //                    disabled: true,
                    iconCls: Ext.ux.Icon('shape_rotate_clockwise'),
                    menu : {
                        items: [{
                            text: bundle.getMsg('account.action.closure.executeperiod'),
                            listeners: {
                                click: function() {
                                    window['AccountApp'].gridPanel.closureBtn.menu.hide(true);
            
                                    var processFn = function(){
                                        
                                        var valid = false;
                                        var year = '';
                                        var nextyear = '';
                                        var month = '';
                                        var nextmonth = '';
                                        
                                        if(window['CalendarApp'].reportPeriodForm.yearField.isValid()){
                                            year = window['CalendarApp'].reportPeriodForm.yearField.getValue();
                                            nextyear = year;
                                            valid = true;
                                        }
                                                        
                                        if(window['CalendarApp'].reportPeriodForm.monthCombo.isVisible()){
                                            month = window['CalendarApp'].reportPeriodForm.monthCombo.getValue();
                                            if(month < 10 && month.length!=2)
                                                month = '0' + month;
                                            var dt = Date.parseDate(year+"-"+month+"-15", "Y-m-d").add(Date.MONTH, 1);
                                            nextmonth = dt.format('m');
                                            if(nextmonth < 10 && nextmonth.length!=2)
                                                nextmonth = '0' + nextmonth;
                                            nextyear = dt.format('Y');
                                            valid = valid==true?true:false;
                                        }
                                        else if(window['CalendarApp'].reportPeriodForm.monthCombo.isVisible())
                                            valid = false; 
                                                        
                                        window['CalendarApp'].reportPeriodForm.getForm().reset(); 
                                        window['CalendarApp'].window.hide();
                                        
                                        if(valid){
                                            var count = 0;
                                            var processComprobant = function(obj, nextFn) {
                                                var comprobants = obj.comprobants;
                                                var total = obj.total;
                
                                                var start = (comprobants.length-total)*-1;
                                                if(comprobants && comprobants.length>0){
                                                    var title = comprobants[0].comment;
                                                    if(!title || title=='')
                                                        title = comprobants[0].name;
                                                    var currentcomprobant = Ext.util.Format.ellipsis(title, 30);
                            
                                                    Ext.MessageBox.progress(bundle.getMsg('app.msg.wait.title'), String.format(bundle.getMsg('account.action.closure.description'), start+1, total) + '...');
                                                    Ext.MessageBox.updateProgress(start/total, currentcomprobant);
                            
                                                    new Ext.data.Connection().request({
                                                        url: 'comprobant/request/method/closecomprobant',
                                                        method: 'POST',
                                                        params: {   
                                                            id: comprobants[0].id
                                                        },
                                                        callback : function(options, success, response) {
                                                            var object = Ext.decode(response.responseText); 
                                                            if(object.success)
                                                                count++;
                                                            obj.comprobants.splice(0,1);
                                                            nextFn(obj, processComprobant);
                                                        }
                                                    });
                                                }
                                                else {
                                                    Ext.MessageBox.hide();
                                                    
                                                    Ext.Msg.show({
                                                        title:bundle.getMsg('app.msg.info.title'),
                                                        msg: String.format(bundle.getMsg('account.action.closure.done'), count),
                                                        buttons: Ext.Msg.OK,
                                                        icon: Ext.MessageBox.INFO
                                                    });
                                                }
                                            };
                    
                                            window['AccountApp'].getPeriodComprobants(month, year, nextmonth, nextyear, processComprobant, processComprobant);
                                        }
                                    };
            
                                    window['CalendarApp'].getPeriod(true, processFn);
                                }
                            }
                        },{
                            text: bundle.getMsg('account.action.closure.exercise'),
                            menu : {
                                items: [{
                                    text: bundle.getMsg('account.action.closure.config'),
                                    listeners: {
                                        click: function(button) {
                                            window['AccountApp'].showClosureConfigWindow(button.getEl(), true, false);
                                        }
                                    }
                                },{
                                    text: bundle.getMsg('account.action.closure.executeexercise'),
                                    listeners: {
                                        click: function(button) {
                                            window['AccountApp'].gridPanel.closureBtn.menu.hide(true);
            
                                            var processFn = function(){
                                                var valid = false;
                                                var year = '';
                                        
                                                if(window['CalendarApp'].reportPeriodForm.yearField.isValid()){
                                                    year = window['CalendarApp'].reportPeriodForm.yearField.getValue();
                                                    valid = true;
                                                }
                                                        
                                                window['CalendarApp'].reportPeriodForm.getForm().reset(); 
                                                window['CalendarApp'].window.hide();
                                        
                                                if(valid){
                                                    var comprobantids = new Array();
                                                    var processClosure = function(obj, nextFn) {
                                                        var closures = obj.array;
                                                        var total = obj.total;
                                                        
                                                        var start = (closures.length-total)*-1;
                                                        if(closures && closures.length>0){
                                                            var title = closures[0].fromaccount.name;
                                                            var currentclosure = Ext.util.Format.ellipsis(title, 30);
                            
                                                            Ext.MessageBox.progress(bundle.getMsg('app.msg.wait.title'), String.format(bundle.getMsg('account.action.closure.executingexercise'), start+1, total) + '...');
                                                            Ext.MessageBox.updateProgress(start/total, currentclosure);
                            
                                                            new Ext.data.Connection().request({
                                                                url: 'account/request/method/movetoaccount',
                                                                method: 'POST',
                                                                params: {   
                                                                    fromaccount: closures[0].fromaccount.id,
                                                                    toaccount: closures[0].toaccount.id,
                                                                    condition: closures[0].conditionvalue,
                                                                    fromdate: year+'-01-01 00:00:00',
                                                                    todate: year+'-12-31 23:59:59',
                                                                    entityid: config.multientityapp ? config.app_entityid : ''
                                                                },
                                                                callback : function(options, success, response) {
                                                                    var object = Ext.decode(response.responseText); 
                                                                    if(object.success){
                                                                        switch(object.message){
                                                                            case  'app.msg.info.savedsuccessful':
                                                                                var data = Ext.decode(object.data);
                                                                                if(data && data.length>0){
                                                                                    var dt = new Date();
                                                                                    new Ext.data.Connection().request({
                                                                                        url: 'comprobant/request/method/save',
                                                                                        method: 'POST',
                                                                                        params: {
                                                                                            creationdate: dt.format('d/m/Y'),
                                                                                            creationtime: dt.format('g:i A'),
                                                                                            comment: bundle.getMsg('comprobant.action.generate.exerciseclosurecomment')+' '+year+ ' ['+(comprobantids.length+1)+']',
                                                                                            transactions: object.data,
                                                                                            ismodificable: '1',
                                                                                            entityid: config.multientityapp ? config.app_entityid : ''
                                                                                        },
                                                                                        callback : function(options, success, response) {
                                                                                            var object = Ext.decode(response.responseText); 
                                                                                            if(object.success)
                                                                                                comprobantids.push(object.data.id);
                                                                    
                                                                                            obj.array.splice(0,1);
                                                                                            nextFn(obj, processClosure);
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else{
                                                                                    obj.array.splice(0,1);
                                                                                    nextFn(obj, processClosure);
                                                                                }
                                                                                break;
                                                                            case  'account.action.closure.error.nonmodificablecomprobant':
                                                                                new Ext.data.Connection().request({
                                                                                    url: config.app_host + '/comprobant/request/method/delete',
                                                                                    params: {
                                                                                        ids: Ext.encode(comprobantids)
                                                                                    },
                                                                                    failure: requestFailed,
                                                                                    success: requestSuccessful,
                                                                                    callback : function(options, success, response) {
                                                                                        Ext.MessageBox.hide();
                                                                                        var detail = '';
                                                                                        for(var i = 0; i < object.data.length; i++){
                                                                                            detail+=object.data[i].name+': '+object.data[i].comment+'<br/>';
                                                                                            if(i > 5){
                                                                                                detail+='<b>...</b><br/>';
                                                                                                break;
                                                                                            }
                                                                                        }
                                                                                        Ext.Msg.show({
                                                                                            title:bundle.getMsg('app.msg.info.title'),
                                                                                            msg: String.format(bundle.getMsg('account.action.closure.error.nonmodificablecomprobant')+':<hr/>'+
                                                                                                detail+'<hr/>'+
                                                                                                bundle.getMsg('account.action.closure.error.nonmodificablecomprobantexplain'), object.data.length),
                                                                                            buttons: Ext.Msg.OK,
                                                                                            icon: Ext.MessageBox.INFO
                                                                                        });                                           
                                                                                    }
                                                                                });
                                                                                
                                                                                break;
                                                                            default:
                                                                                break;
                                                                        }
                                                                    }
                                                                }
                                                            });
                                                        }
                                                        else {
                                                            var dt = new Date();
                                                                                    
                                                            new Ext.data.Connection().request({
                                                                url: 'closeup/request/method/save',
                                                                method: 'POST',
                                                                params: {
                                                                    creationdate: '31/12/'+year,
                                                                    comment: Ext.encode(comprobantids),
                                                                    entityid: config.multientityapp ? config.app_entityid : ''
                                                                },
                                                                callback : function(options, success, response) {                                                                    
                                                                    Ext.MessageBox.hide();
                                                    
                                                                    Ext.Msg.show({
                                                                        title:bundle.getMsg('app.msg.info.title'),
                                                                        msg: String.format(bundle.getMsg('account.action.closure.exercisedone'), comprobantids.length),
                                                                        buttons: Ext.Msg.OK,
                                                                        icon: Ext.MessageBox.INFO
                                                                    });
                                                            
                                                                }
                                                            });
                                                        }
                                                    };
                    
                                                    window['AccountApp'].getClosureConfig(processClosure, processClosure);
                                                }
                                            };
                                            
                                            window['ComprobantApp'].checkClosure(function(){
                                                window['CalendarApp'].getPeriod(false, processFn);
                                            })
                                        }
                                    }
                                },'-',{
                                    text: bundle.getMsg('account.action.closure.executeexerciserevert'),
                                    listeners: {
                                        click: function(button) {
                                            window['AccountApp'].gridPanel.closureBtn.menu.hide(true);
            
                                            var processFn = function(){
                                                var valid = false;
                                                var year = '';
                                        
                                                if(window['CalendarApp'].reportPeriodForm.yearField.isValid()){
                                                    year = window['CalendarApp'].reportPeriodForm.yearField.getValue();
                                                    valid = true;
                                                }
                                                        
                                                window['CalendarApp'].reportPeriodForm.getForm().reset(); 
                                                window['CalendarApp'].window.hide();
                                        
                                                if(valid){
                                                    new Ext.data.Connection().request({
                                                        url: 'closeup/request/method/load/component/grid/start/0/limit/12',
                                                        method: 'POST',
                                                        params: {
                                                            filter: '[{"type":"date","comparison":"let","value":"31/12/'+year+'","field":"creationdate"},{"type":"date","comparison":"get","value":"01/01/'+year+'","field":"creationdate"}]',
                                                            entityid: config.multientityapp ? config.app_entityid : ''
                                                        },
                                                        callback : function(options, success, response) {
                                                            var object = Ext.decode(response.responseText); 
                                                            
                                                            var processClosure = function(obj, nextFn) {
                                                                var closures = obj.array;
                                                                var total = obj.total;
                                                        
                                                                var start = (closures.length-total)*-1;
                                                                if(closures && closures.length>0){
                                                                    var title = closures[0].name;
                                                                    var currentclosure = Ext.util.Format.ellipsis(title, 30);
                            
                                                                    Ext.MessageBox.progress(bundle.getMsg('app.msg.wait.title'), String.format(bundle.getMsg('account.action.closure.executingexerciserevert'), start+1, total) + '...');
                                                                    Ext.MessageBox.updateProgress(start/total, currentclosure);
                                                                    
                                                                    new Ext.data.Connection().request({
                                                                        url: config.app_host + '/comprobant/request/method/delete',
                                                                        params: {
                                                                            ids: closures[0].comment
                                                                        },
                                                                        callback : function(options, success, response) {
                                                                            new Ext.data.Connection().request({
                                                                                url: config.app_host + '/closeup/request/method/delete',
                                                                                params: {
                                                                                    ids: '["'+closures[0].id+'"]'
                                                                                },
                                                                                callback : function(options, success, response) {
                                                                                    obj.array.splice(0,1);
                                                                                    nextFn(obj, processClosure);                            
                                                                                }
                                                                            });                                  
                                                                        }
                                                                    });
                                                                }
                                                                else {
                                                                    Ext.MessageBox.hide();
                                                    
                                                                    Ext.Msg.show({
                                                                        title:bundle.getMsg('app.msg.info.title'),
                                                                        msg: String.format(bundle.getMsg('account.action.closure.exercisereverdone'), year),
                                                                        buttons: Ext.Msg.OK,
                                                                        icon: Ext.MessageBox.INFO
                                                                    });
                                                                }
                                                            };
                                                            
                                                            var obj = new Object;
                                                            obj.array = object.data;
                                                            obj.total = object.data.length;
                                                            processClosure(obj, processClosure);
                                                        }
                                                    });
                                                            
                                                //                                                    
                                                }
                                            };
            
                                            window['CalendarApp'].getPeriod(false, processFn);
                                        }
                                    }
                                }]
                            }
                        }]
                    }
                },'->', new Ext.Toolbar.TextItem({
                    id: 'accounttransactionfromdatelabel',
                    text: bundle.getMsg('app.form.since')+':'
                }), {
                    xtype:'datefield',
                    vtype: 'daterange',
                    width: 90, 
                    id: 'accounttransactionfromdate',
                    endDateField: 'accounttransactiontodate'
                }, new Ext.Toolbar.TextItem({
                    id: 'accounttransactiontodatelabel',
                    text: '  '+bundle.getMsg('app.form.to')+':'
                }), {
                    vtype: 'daterange',
                    xtype:'datefield',
                    width: 90, 
                    id: 'accounttransactiontodate',
                    startDateField: 'accounttransactionfromdate'
                },{
                    ref: '../reportBtn',
                    text: bundle.getMsg('app.languaje.report.label'),
                    iconCls: Ext.ux.Icon('report'),
                    menu : {
                        items: [{
                            text: bundle.getMsg('account.action.report.mayor'),
                            disabled: true,
                            listeners: {
                                click: function() {
                                    window['AccountApp'].printReport('mayor');
                                }
                            }
                        },{
                            text: bundle.getMsg('account.action.report.submayor'),
                            disabled: true,
                            listeners: {
                                click: function() {
                                    window['AccountApp'].printReport('submayor');                                        
                                }
                            }
                        },'-',{
                            text: bundle.getMsg('account.action.report.balance'),
                            listeners: {
                                click: function() {
                                    window['AccountApp'].printReport('balance');                                        
                                }
                            }
                        }]
                    }
                },{
                    ref: '../consolidateBtn',
                    disabled: true,
                    hidden: true,
                    text: bundle.getMsg('account.action.consolidate'),
                    iconCls: Ext.ux.Icon('computer_add'),
                    handler: function(){
                        var callback = function(){
                            window['AccountApp'].gridPanel.getLoader().baseParams.balancerecursive = '';
                            window['AccountApp'].gridPanel.getLoader().baseParams.fromdate = '';
                            window['AccountApp'].gridPanel.getLoader().baseParams.todate = '';
                        };
                        
                        window['AccountApp'].gridPanel.getLoader().baseParams.balancerecursive = true; 
                        window['AccountApp'].gridPanel.getLoader().baseParams.fromdate = '';
                        if(Ext.getCmp('accounttransactionfromdate').getValue())
                            window['AccountApp'].gridPanel.getLoader().baseParams.fromdate = Ext.getCmp('accounttransactionfromdate').getValue().format('d/m/Y');
                        window['AccountApp'].gridPanel.getLoader().baseParams.todate = '';
                        if(Ext.getCmp('accounttransactiontodate').getValue())
                            window['AccountApp'].gridPanel.getLoader().baseParams.todate = Ext.getCmp('accounttransactiontodate').getValue().format('d/m/Y');
                        
                        var record = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                        if (record.length==1)
                            resetTree(window['AccountApp'].gridPanel, record[0], record[0].parentNode, callback);
                        else
                            window['AccountApp'].gridPanel.getLoader().load(window['AccountApp'].gridPanel.getRootNode(), callback);
                        
                    }
                },'-',{
                    ref: '../expandBtn',
                    iconCls: Ext.ux.Icon('expand-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.expandall'),
                    listeners: {
                        click: function() {
                            var nodes = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                            if(nodes.length>0)
                                for(var i = 0; i < nodes.length; i++)
                                    nodes[i].expand(true);
                            else{
                                window['AccountApp'].gridPanel.expandAll();
                                window['AccountApp'].gridPanel.expandBtn.setDisabled(true);
                                window['AccountApp'].gridPanel.collapseBtn.setDisabled(false);
                            }
                        }
                    }
                },{
                    ref: '../collapseBtn',
                    disabled: true,
                    iconCls: Ext.ux.Icon('collapse-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.collapseall'),
                    listeners: {
                        click: function() {
                            var nodes = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                            if(nodes.length>0)
                                for(var i = 0; i < nodes.length; i++)
                                    nodes[i].collapse(true);
                            else {
                                window['AccountApp'].gridPanel.collapseAll();
                                window['AccountApp'].gridPanel.expandBtn.setDisabled(false);
                                window['AccountApp'].gridPanel.collapseBtn.setDisabled(true);
                            }
                        }
                    }
                }],
                
                bbar: new Ext.PagingToolbar({
                    pageSize: Number.MAX_VALUE,
                    store: this.store,
                    items:[{
                        tooltip: bundle.getMsg('app.form.clearfilters'),
                        iconCls: Ext.ux.Icon('table_lightning'),
                        handler: function () {
                            window['AccountApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['AccountApp'].infoTextItem.getEl()).update('');
                            window['AccountApp'].gridPanel.getSelectionModel().clearSelections();
                        } 
                    },'-', this.infoTextItem],
                    doRefresh : function(){
                        window['AccountApp'].gridPanel.getRootNode().removeAll();
                        window['AccountApp'].gridPanel.getLoader().load(window['AccountApp'].gridPanel.getRootNode());
                        
                        window['AccountApp'].gridPanel.expandBtn.setDisabled(false);
                        window['AccountApp'].gridPanel.collapseBtn.setDisabled(true);
                    },
                    displayInfo: true,
                    displayMsg: bundle.getMsg('app.bbar.msg'),
                    emptyMsg: bundle.getMsg('app.bbar.msg'),
                    listeners: {
                        render: function(toolbar) {
                            toolbar.items.items[4].setDisabled(true);
                        }
                    }
                })
            });
            
            this.contentPanel = new Ext.Panel({  
                id: 'gridPanelAccount',
                layout:'border',
                border: false,
                split: true,
                
                listeners: {
                    activate: function(gridpanel){
                        window['ElementApp'].comboStore.load({
                            params:{
                                entityid: config.app_entityid,
                                limit: ''
                            },
                            callback: function(records, options, success ){
                                window['AccountApp'].gridPanel.getBottomToolbar().doRefresh();
                            }
                        });                        
                    }
                },
                items: [this.gridPanel,{
                    id: 'accountcomprobants-bottom-preview',
                    layout:'fit',
                    items: window['AccountApp'].comprobantGridPanel,
                    height: 250,
                    minSize: 150,
                    maxSize: 350,
                    split: true,
                    border:false,
                    region:'south'
                }, {
                    id: 'accountcomprobants-right-preview',
                    layout:'fit',
                    border:false,
                    region:'east',
                    width:450,
                    minSize: 350,
                    maxSize: 600,
                    split: true,
                    hidden:true
                }]
            });
            
            this.formPanel = new Ext.FormPanel({
                labelAlign: 'top',
                url: config.app_host + '/account/request/method/save',
                frame:true,	
                bodyStyle:'padding:5px 5px 0',				        
                keys: [formKeyMaping],
                items: [{
                    layout:'column',
                    items:[{
                        columnWidth:.05,
                        layout: 'form',
                        items: [{
                            ref: '../../manualcodeCheckBox',
                            xtype:'checkbox',
                            name: 'manualcode',
                            fieldLabel: '',
                            labelSeparator: '',
                            boxLabel: '',
                            listeners: {
                                check : function(checkbox, checked) {
                                    window['AccountApp'].formPanel.codetTextField.setDisabled(!checked);
                                    if(!checked)
                                        window['AccountApp'].formPanel.codetTextField.reset();
                                }
                            }
                        }]
                    },{
                        columnWidth:.5,
                        layout: 'form',
                        items: [{
                            ref: '../../codetTextField',
                            xtype:'textfield',
                            name: 'code',
                            fieldLabel: bundle.getMsg('app.form.code')+'<span style="color:red;"><sup>*</sup></span>', 
                            anchor:'-20',
                            disabled: true,
                            allowBlank: false
                        }]
                    },{
                        columnWidth:.45,
                        layout: 'form',
                        items: [{
                            xtype: 'radiogroup',
                            id: 'accountnature',
                            fieldLabel: bundle.getMsg('account.field.nature'),
                            width: 150,
                            items: [{
                                boxLabel: bundle.getMsg('account.field.naturedebit'), 
                                id: 'accountdebit', 
                                name: 'accountnature', 
                                inputValue: false
                            },{
                                boxLabel: bundle.getMsg('account.field.naturecredit'), 
                                id: 'accountcredit', 
                                name: 'accountnature', 
                                inputValue: true, 
                                checked: true
                            }]
                        }]
                    }]
                },{
                    xtype:'textfield',
                    name: 'name',
                    fieldLabel: bundle.getMsg('account.field.name')+'<span style="color:red;"><sup>*</sup></span>', 
                    anchor:'-20',
                    allowBlank: false
                },{
                    xtype:'textarea',
                    name: 'comment',
                    fieldLabel: bundle.getMsg('account.field.comment'), 
                    anchor:'-20'
                }, new Ext.form.ComboBox({
                    fieldLabel : bundle.getMsg('account.field.parent'),
                    store: this.comboStore,
                    name: 'parent',
                    anchor:'-20',
                    emptyText: bundle.getMsg('app.form.typehere'),
                    minChars: 1, //para q busque a partir de 1 caracter...
                    displayField: 'name',
                    typeAhead: false,
                    loadingText: bundle.getMsg('app.msg.wait.searching'),
                    pageSize: config.app_elementsongrid/2,
                    hideTrigger:true,
                    tpl: new Ext.XTemplate(
                        '<tpl for="."><div class="search-item">',
                        '<h3><span>{parent}</span>{name}</h3>',
                        '{comment}',
                        '</div></tpl>'
                        ),
                    itemSelector: 'div.search-item',
                    listeners: {
                        beforequery: function(queryEvent) {
                            var node = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                            if (node && node.length>0){
                                node = node[0];
                                        
                                var elements = new Array();
                                var element = new Object;
                                element.id = node.id;
                                elements.push(element);
                                        
                                window['AccountApp'].comboStore.baseParams.distinct = Ext.encode(elements);
                            }
                            this.setValue(queryEvent.query);
                        },
                        select: function(combo, record, index ){
                            window['AccountApp'].parentRecord = record;
                            this.collapse();
                        },
                        blur: function(field) {		
                            if(field.getRawValue() == '')
                                window['AccountApp'].parentRecord = false;
                            else {
                                var record = field.getStore().getAt(field.getStore().find('name',field.getRawValue(), 0, true, true));								 
                                if(record && record.get('name') == field.getRawValue())
                                    window['AccountApp'].parentRecord = record;
                                else 
                                    window['AccountApp'].parentRecord = false;
                            }
                        }
                    }
                })]
            });
            
            this.closureconfigFormPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/db/request/method/saveConfig',
                //                frame:true,
                //                bodyStyle:'padding:5px 5px 0',						        
                keys: [formKeyMaping],
                items: [new Ext.grid.GridPanel({
                    ref: 'gridPanel',
                    stripeRows: true,
                    autoExpandColumn: 'accountclosureconfigmaincolumn',	
                    store: this.selectedClosureConfigComboStore,
                    anchor:'0',
                    height: 300,
                    //                    frame: true,
                    sm: new Ext.grid.RowSelectionModel({
                        listeners: {
                            selectionchange: function(selectionModel) {
                                Ext.getCmp('btnRemoveClosureConfig').setDisabled(selectionModel.getCount() < 1);
                            }
                        }
                    }),	
                    
                    columns: [{
                        header: bundle.getMsg('account.action.closure.config.fromaccount'),
                        width: 325, 
                        sortable: true, 
                        dataIndex: 'fromaccount'
                    },{
                        header: bundle.getMsg('account.action.closure.config.toaccount'),
                        width: 325, 
                        sortable: true, 
                        dataIndex: 'toaccount'
                    },{
                        id:'accountclosureconfigmaincolumn', 
                        header: bundle.getMsg('account.action.closure.config.condition'),
                        width: 150, 
                        sortable: true, 
                        dataIndex: 'condition'
                    }],
                    tbar: [{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'+bundle.getMsg('account.action.closure.config.fromaccount')+'<span style="color:red;"><sup>*</sup></span>:&nbsp;'
                    }, new Ext.ux.TreeCombo({
                        id: 'accountclosurefromaccountCombo',
                        name: 'accountid',
                        fieldLabel: bundle.getMsg('account.field.label'),
                        emptyText: bundle.getMsg('app.form.select'),
                        typeAhead: true,
                        valueField: 'id',    
                        displayField: 'name',
                        triggerAction:'all',
                        width: 200, 
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
                            },
                            beforequery: function(queryEvent) {
                                queryEvent.combo.getTree().setHeight(queryEvent.combo.maxHeight);
                                this.setValue(queryEvent.query);
                            }
                        },
                        allowBlank:false
                    }),{
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'+bundle.getMsg('account.action.closure.config.toaccount')+'<span style="color:red;"><sup>*</sup></span>:&nbsp;'
                    }, new Ext.ux.TreeCombo({
                        id: 'accountclosuretoaccountCombo',
                        name: 'accountid',
                        fieldLabel: bundle.getMsg('account.field.label'),
                        emptyText: bundle.getMsg('app.form.select'),
                        typeAhead: true,
                        valueField: 'id',    
                        displayField: 'name',
                        triggerAction:'all',
                        width: 200, 
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
                            },
                            beforequery: function(queryEvent) {
                                queryEvent.combo.getTree().setHeight(queryEvent.combo.maxHeight);
                                this.setValue(queryEvent.query);
                            }
                        },
                        allowBlank:false
                    }), {
                        xtype: 'displayfield', 
                        value: '&nbsp;&nbsp;'+bundle.getMsg('account.action.closure.config.condition')+':&nbsp;'
                    }, new Ext.form.ComboBox({
                        ref: '../conditionCombo',
                        store: this.conditionComboStore,
                        width: 100, 
                        valueField: 'nick',
                        displayField:'name',
                        typeAhead: true,
                        mode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        selectOnFocus:true
                    }), '->',{
                        tooltip: bundle.getMsg('app.form.addrow'),
                        iconCls: Ext.ux.Icon('table_row_insert'),
                        listeners: {
                            click: function(button, eventObject) { 
                                if(Ext.getCmp('accountclosurefromaccountCombo').isValid() && Ext.getCmp('accountclosuretoaccountCombo').isValid()){
                                    var fromaccount = Ext.getCmp('accountclosurefromaccountCombo').getSelectedNode(Ext.getCmp('accountclosurefromaccountCombo').getValue());
                                    var toaccount = Ext.getCmp('accountclosuretoaccountCombo').getSelectedNode(Ext.getCmp('accountclosuretoaccountCombo').getValue());
                                    
                                    window['AccountApp'].selectedClosureConfigComboStore.insert(window['AccountApp'].selectedClosureConfigComboStore.getCount(), new Ext.data.Record({
                                        fromaccountobj: fromaccount && fromaccount.attributes ? fromaccount.attributes : false,
                                        fromaccount: fromaccount && fromaccount.attributes && fromaccount.attributes.manualcode ? fromaccount.attributes.code + " " + fromaccount.attributes.name : fromaccount.attributes.name,
                                        toaccountobj: toaccount && toaccount.attributes ? toaccount.attributes : false,
                                        toaccount: toaccount && toaccount.attributes && toaccount.attributes.manualcode ? toaccount.attributes.code + " " + toaccount.attributes.name : toaccount.attributes.name,
                                        condition: window['AccountApp'].closureconfigFormPanel.gridPanel.conditionCombo.getRawValue(),
                                        conditionvalue: window['AccountApp'].closureconfigFormPanel.gridPanel.conditionCombo.getValue()
                                    }));
                                    
                                    Ext.getCmp('accountclosurefromaccountCombo').reset();
                                    Ext.getCmp('accountclosuretoaccountCombo').reset();
                                    window['AccountApp'].closureconfigFormPanel.gridPanel.conditionCombo.reset();
                                }
                            }
                        }
                    },{
                        tooltip: bundle.getMsg('app.form.deleterow'),
                        id: 'btnRemoveClosureConfig',
                        disabled: true,
                        iconCls: Ext.ux.Icon('table_row_delete'),
                        listeners: {
                            click: function(button, eventObject) {
                                var records = window['AccountApp'].closureconfigFormPanel.gridPanel.getSelectionModel().getSelections();
                                window['AccountApp'].selectedClosureConfigComboStore.remove(records);
                            }
                        }
                    }]
                })]
            });
        
        },
        
        
        
        showImportForm : function(showInId, uploadTo, processUpload){
            Ext.getCmp('picture').regex = /^.*.(xls|XLS|xlsx|XLSX)$/;
            //showInId, uploadTo, processFn, redefineName, resetImg, webcamDisabled
            showPictureForm(showInId, uploadTo, processUpload, true);
        },
        
        showClosureConfigWindow : function(animateTarget, hideApply, callback){        
            var cancelFn = function(){
                window['AccountApp'].selectedClosureConfigComboStore.removeAll();
            };
            
            var processClosure = function(obj, nextFn) {
                var closures = obj.array;
                
                window['AccountApp'].selectedClosureConfigComboStore.removeAll();
                    
                for(var i = 0; closures && i < closures.length; i++){
                    window['AccountApp'].selectedClosureConfigComboStore.insert(window['AccountApp'].selectedClosureConfigComboStore.getCount(), new Ext.data.Record({
                        fromaccountobj: closures[i].fromaccount,
                        fromaccount: closures[i].fromaccount.manualcode ? closures[i].fromaccount.code + " " + closures[i].fromaccount.name : closures[i].fromaccount.name,
                        toaccountobj:  closures[i].toaccount,
                        toaccount: closures[i].toaccount.manualcode ?closures[i].toaccount.code + " " + closures[i].toaccount.name : closures[i].toaccount.name,
                        condition: closures[i].condition,
                        conditionvalue: closures[i].conditionvalue
                    }));
                }
                    
                window['AccountApp'].window = App.showWindow(bundle.getMsg('account.action.closure.config'), 790, 367, window['AccountApp'].closureconfigFormPanel, 
                    function(button){
                            
                        var accounts = new Array();
                        window['AccountApp'].selectedClosureConfigComboStore.each(function(record){
                            var r = new Object;
                            r.fromaccount = record.data.fromaccountobj;
                            r.fromaccount.loader = false;
                            r.toaccount = record.data.toaccountobj;
                            r.toaccount.loader = false;
                            r.condition = record.data.condition;
                            r.conditionvalue = record.data.conditionvalue;
                            accounts.push(r);
                        });
                    
                        var config = new Object;
                        config.name = 'app_closureconfig';
                        config.value = Ext.encode(accounts);
                            
                        var array = new Array();
                        array.push(config);
                            
                        window['AccountApp'].closureconfigFormPanel.getForm().submit({
                            waitTitle : bundle.getMsg('app.msg.wait.title'), 
                            waitMsg: bundle.getMsg('app.msg.wait.text'), 
                            clientValidation: true,
                            //submitEmptyText: false,
                            params: {
                                config: Ext.encode(array)
                            },
                            success: function(form, action) {
                                checkSesionExpired(form, action);     
                                                                
                                submitFormSuccessful('AccountApp', form, action, button, true, cancelFn, callback);
                            },
                            failure: loadFormFailed
                        });
                    }, 
                    function(){
                        cancelFn();
                        window['AccountApp'].window.hide();
                    }, 
                    animateTarget,
                    false,
                    false,
                    false,
                    hideApply ? hideApply : false);  
            };
                    
            window['AccountApp'].getClosureConfig(processClosure, processClosure);            
        },
        
        showWindow : function(animateTarget, hideApply, callback){        
            var cancelFn = function(){
                window['AccountApp'].parentRecord = false;
                
                var node = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                if(node && node.length>0){
                    node = node[0];
                    window['AccountApp'].gridPanel.expandBtn.setDisabled(false);
                    resetTree(window['AccountApp'].gridPanel, node, false);
                }
            };
            window['AccountApp'].window = App.showWindow(bundle.getMsg('account.window.title'), 420, 370, window['AccountApp'].formPanel, 
                function(button){
                    var nodes = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
                    var node = false;
                    if(nodes && nodes.length>0)
                        node = nodes[0];
                    window['AccountApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        //submitEmptyText: false,
                        params: {
                            id: node ? node.id:'',
                            parentid: window['AccountApp'].parentRecord ? window['AccountApp'].parentRecord.id :'',
                            path: window['AccountApp'].parentRecord ? window['AccountApp'].parentRecord.data.path : window['AccountApp'].gridPanel.getRootNode().getPath(),
                            entityid: config.multientityapp ? config.app_entityid : ''
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);     
                            if(node)
                                window['AccountApp'].gridPanel.expandBtn.setDisabled(false);
                                
                            resetTree(window['AccountApp'].gridPanel, node, window['AccountApp'].parentRecord ? window['AccountApp'].parentRecord : false);
                            
                            submitFormSuccessful('AccountApp', form, action, button, !node, cancelFn, callback);
                        },
                        failure: loadFormFailed
                    });
                }, 
                function(){
                    cancelFn();
                    window['AccountApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },
        
        movePreview : function(m, pressed){
            if(!m){ // cycle if not a menu item click
                var items = Ext.menu.MenuMgr.get('account-comprobants-menu').items.items;
                var b = items[0], r = items[1], h = items[2];
                if(b.checked){
                    r.setChecked(true);
                }else if(r.checked){
                    h.setChecked(true);
                }else if(h.checked){
                    b.setChecked(true);
                }
                return;
            }
            if(pressed){
                var preview = window['AccountApp'].comprobantGridPanel;
                var right = Ext.getCmp('accountcomprobants-right-preview');
                var bot = Ext.getCmp('accountcomprobants-bottom-preview');
                var btn = window['AccountApp'].gridPanel.comprobantsBtn;
                switch(m.text){
                    case bundle.getMsg('account.action.comprobant.bottom'):
                        right.hide();
                        bot.add(preview);
                        bot.show();
                        bot.ownerCt.doLayout();
                        btn.setIconClass(Ext.ux.Icon('preview-bottom', 'myicons'));
                        break;
                    case bundle.getMsg('account.action.comprobant.right'):
                        bot.hide();
                        right.add(preview);
                        right.show();
                        right.ownerCt.doLayout();
                        btn.setIconClass(Ext.ux.Icon('preview-right', 'myicons'));
                        break;
                    case bundle.getMsg('account.action.comprobant.hide'):
                        preview.ownerCt.hide();
                        preview.ownerCt.ownerCt.doLayout();
                        btn.setIconClass(Ext.ux.Icon('preview-hide', 'myicons'));
                        break;
                }
            }
        },
        
        printReport : function(view) {
            var url = '/account';
            
            switch(view){
                case 'mayor':
                case 'submayor':
                    url += '/mayor/view/'+view;
                    break;
                case 'balance':
                    url += '/balance';
                    break;
                default:
                    break;
            }
            
            url += '/entityid/'+config.app_entityid;
            
            var record = window['AccountApp'].gridPanel.getSelectionModel().getSelectedNodes();
            if(record && record[0])
                url += '/id/'+record[0].id;
            
            if(Ext.getCmp('accounttransactionfromdate').getValue())
                url += '/fromdate/'+Ext.getCmp('accounttransactionfromdate').getValue().format('Y-m-d')+' 00:00:00';
            if(Ext.getCmp('accounttransactiontodate').getValue())
                url += '/todate/'+Ext.getCmp('accounttransactiontodate').getValue().format('Y-m-d')+' 23:59:59';
            
            App.printView(url, ' ', ' ');                                 
        },
        
        getClosureConfig: function(process, callback) {
            var msg=App.mask.msg;
            App.mask.msg=bundle.getMsg('account.action.closure.findingconfig')+'...';
            App.mask.show();
            
            new Ext.data.Connection().request({
                url: config.app_host + '/account/request/method/loadclosureconfig',
                method: 'POST',
                callback : function(options, success, response) {
                    App.mask.hide();
                    App.mask.msg = msg;
                    
                    var json = Ext.decode(response.responseText); 
                                        
                    var obj = new Object;
                    obj.json = json;
                    obj.array = Ext.decode(json.data);
                    obj.total = obj.array.length;
                                                     
                    process(obj, callback);
                }
            });
        },
        
        getPeriodComprobants: function(month, year, nextmonth, nextyear, process, callback) {
            var msg=App.mask.msg;
            App.mask.msg=bundle.getMsg('account.action.closure.findingcomprobants')+'...';
            App.mask.show();
            
            new Ext.data.Connection().request({
                url: config.app_host + '/comprobant/request/method/load/component/grid/limit/10000',
                params: {
                    entityid: config.app_entityid,
                    filter: '[{"type":"date","comparison":"get","value":"01/'+month+'/'+year+'","field":"creationdate"},{"type":"date","comparison":"lt","value":"01/'+nextmonth+'/'+nextyear+'","field":"creationdate"}]'
                },
                failure: requestFailed,
                success: requestSuccessful,
                callback : function(options, success, response) {
                    App.mask.hide();
                    App.mask.msg = msg;
                    
                    var json = Ext.decode(response.responseText); 
                                        
                    var obj = new Object;
                    obj.json = json;
                    obj.comprobants = json.data;
                    obj.total = obj.comprobants.length;
                                                     
                    process(obj, callback);
                }
            });
        },
        
        applySecurity : function(groups, permissions){
            window['AccountApp'].gridPanel.addBtn.setVisible(permissions.indexOf('manageaccount') != -1 || permissions.indexOf('manageaccountadd') != -1);
            window['AccountApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('manageaccount') != -1 || permissions.indexOf('manageaccountedit') != -1);
            window['AccountApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('manageaccount') != -1 || permissions.indexOf('manageaccountdelete') != -1);            
            window['AccountApp'].gridPanel.splitBtn.setVisible(permissions.indexOf('manageaccount') != -1 || permissions.indexOf('manageaccountsplit') != -1);            
            
            var consolidable = permissions.indexOf('manageaccount') != -1 || permissions.indexOf('manageaccountconsolidate') != -1;
            //            window['AccountApp'].gridPanel.consolidateBtn.setVisible(consolidable);            
            window['AccountApp'].gridPanel.consolidateBtn.setVisible(false);            
            window['AccountApp'].gridPanel.reportBtn.setVisible(consolidable);            
            
            Ext.getCmp('accounttransactionfromdatelabel').setVisible(consolidable);
            Ext.getCmp('accounttransactionfromdate').setVisible(consolidable);
            Ext.getCmp('accounttransactiontodatelabel').setVisible(consolidable);
            Ext.getCmp('accounttransactiontodate').setVisible(consolidable);
        }
    }
}();

