/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage costcenter
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */

CostcenterApp = function() {
    return {
        init : function(CostcenterApp) {
            
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/costcenter/request/method/load',
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
                url: config.app_host + '/costcenter/request/method/load',
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
                            if(records[i].get('customicon') && records[i].get('customicon').icon != '' && records[i].get('customicon').icon != 'building.png')
                                records[i].set('icontip', '<img src="images/icons/famfamfamflag/'+records[i].get('customicon')+'" />');
                            else
                                records[i].set('icontip', '<img src="images/icons/famfamfam/building.png" />');
                        }
                        alertNoRecords(records, bundle.getMsg('costcenter.tab.label').toLowerCase());
                    },
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : Ext.emptyFn
                }
            });            
            
            this.filters = new Ext.ux.grid.GridFilters({
                encode: true,
                costcenter: false,
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
                url: config.app_host + '/costcenter/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });	
            this.gridPanel = new Ext.ux.tree.TreeGrid({
                //                id: 'gridPanelCostcenter',
                rootVisible:false,
                iconCls: Ext.ux.Icon('building'),
                
                region:'center',
                title: config.app_showgridtitle ? bundle.getMsg("costcenter.grid.title") : '',
                autoExpandColumn: 'costcentermaincolumn',
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
                        window['CostcenterApp'].gridPanel.getBottomToolbar().doRefresh();
                    }
                },{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function() {
                        App.printView(window['CostcenterApp'].gridPanel);
                    }
                },{
                    id:'help',
                    qtip: bundle.getMsg('app.layout.help'),
                    handler: function(button, eventObject) {
                    //window.open('../uploads/docs/usermanual.pdf#page=26&zoom=auto,26,425');
                    //                        window.open('../uploads/tutorial/05 Gestion de Costcenteres.html');
                    }
                }],
                
                columns: [{
                    id:'costcentermaincolumn', 
                    header: bundle.getMsg('app.form.name'), 
                    width: 280, 
                    sortable: true, 
                    dataIndex: 'name'
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
                            
                            window['CostcenterApp'].gridPanel.duplicateBtn.setDisabled(!obj.deleteable || nodes.length < 1);    
                            window['CostcenterApp'].gridPanel.assetsBtn.setDisabled(selectionModel.getSelectedNodes().length != 1 || !obj.allleaf);
                            
                            window['CostcenterApp'].gridPanel.consolidateBtn.setDisabled(selectionModel.getSelectedNodes().length > 1);                            
                            Ext.getCmp('costcenterassetfromdate').setDisabled(window['CostcenterApp'].gridPanel.consolidateBtn.disabled);
                            Ext.getCmp('costcenterassettodate').setDisabled(window['CostcenterApp'].gridPanel.consolidateBtn.disabled);
    
                            if(obj.allleaf && nodes.length == 1){
                                for (var i = 0; i < window['CostcenterApp'].assetGridPanel.getStore().getCount(); i++) 
                                    window['CostcenterApp'].expander.collapseRow(i);
                                
                                
                                window['CostcenterApp'].assetGridPanel.getSelectionModel().clearSelections();
                                window['CostcenterApp'].assetGridPanel.setTitle(String.format(bundle.getMsg("costcenter.asset.grid.title"), nodes[0].attributes.name));
                                window['CostcenterApp'].assetGridPanel.getStore().load({
                                    params:{
                                        costcenterid: nodes[0].attributes.id,
                                        fromdate: Ext.getCmp('costcenterassetfromdate').getValue() ? Ext.getCmp('costcenterassetfromdate').getValue().format('d/m/Y') : '',
                                        todate: Ext.getCmp('costcenterassettodate').getValue() ? Ext.getCmp('costcenterassettodate').getValue().format('d/m/Y') : ''
                                    }
                                });
                            }
                            else
                                window['CostcenterApp'].assetGridPanel.getStore().removeAll();
    
    
                            if(nodes.length < 1 || !obj.allleaf)            
                                window['CostcenterApp'].movePreview.defer(1, this, [Ext.getCmp('costcenterassethide'), true]);

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
                        window['CostcenterApp'].gridPanel.updateBtn.fireEvent('click', window['CostcenterApp'].gridPanel.updateBtn);
                        return false;
                    },
                    beforeexpandnode: function(node, deep, anim){
                        node.getOwnerTree().collapseBtn.setDisabled(false);
                    },
                    beforecollapsenode: function(node, deep, anim){
                        node.getOwnerTree().expandBtn.setDisabled(false);
                    },
                    filterupdate: function(){
                        var text = App.getFiltersText(window['CostcenterApp'].gridPanel);
                        if(text && text!=''){
                            Ext.fly(window['CostcenterApp'].infoTextItem.getEl()).update(String.format(bundle.getMsg('app.form.filteringby'), text));
                            window['CostcenterApp'].infoTextItem.getEl().highlight('#FFFF66', {
                                block:true
                            });
                        }
                        else
                            Ext.fly(window['CostcenterApp'].infoTextItem.getEl()).update('');
                    }
                },
                
                loader: new Ext.tree.TreeLoader({
                    baseParams: {
                        component: 'tree',
                        start: 0
                    },
                    dataUrl: config.app_host + '/costcenter/request/method/load',
                    listeners: {
                        beforeload: beforeloadStore,
                        load: function(treeLoader, node, response){
                            node.getOwnerTree().treeGridSorter = new Ext.ux.tree.TreeGridSorter(node.getOwnerTree(), {
                                property: node.getOwnerTree().columns[0].dataIndex
                            });
                            node.getOwnerTree().treeGridSorter.doSort(node);
                                
                            if(response.responseText.indexOf('signinForm')>0)
                                showSesionExpiredMsg();                            
                            
                            for(var i = 0; i < node.childNodes.length; i++){
                                if(!node.childNodes[i].attributes.deleteable || node.childNodes[i].attributes.deleteable == 0)
                                    node.childNodes[i].getUI().addClass('row-italic');
                                
                                node.childNodes[i].setIconCls(Ext.ux.Icon('building'));
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
                        }
                    }
                }),
                
                tbar: [{
                    text: bundle.getMsg('app.form.add'),
                    iconCls: Ext.ux.Icon('add'),
                    ref: '../addBtn',
                    listeners: {
                        click: function(button, eventObject, hideApply, callback) {
                            window['CostcenterApp'].gridPanel.getSelectionModel().clearSelections();
                            window['CostcenterApp'].gridPanel.updateBtn.fireEvent('click', button, eventObject, hideApply, callback);
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
                            var record = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                            if (record.length==1){
                                var dr = new Ext.data.Record({
                                    code: record[0].attributes.code,
                                    name: record[0].attributes.name,
                                    comment: record[0].attributes.comment,
                                    parent: record[0].attributes.parent,
                                    icon: record[0].attributes.customicon && record[0].attributes.customicon != 'ppa' ? record[0].attributes.customicon : '',
                                    parentid: record[0].attributes.Costcenter ? record[0].attributes.Costcenter.name : ''
                                });
                                
                                if (!window['CostcenterApp'].parentRecord){
                                    window['CostcenterApp'].parentRecord = new Object;
                                    window['CostcenterApp'].parentRecord.data = new Object;
                                }
                                window['CostcenterApp'].parentRecord.id = record[0].attributes.parentid;
                                window['CostcenterApp'].parentRecord.data.path = record[0].parentNode.getPath();
                                window['CostcenterApp'].formPanel.getForm().loadRecord(dr);
                                
                                window['CostcenterApp'].loadFormElements(Ext.getCmp('costcenterElementsPanel'), record[0].attributes.Elements);
                            }
                            else
                                window['CostcenterApp'].loadFormElements(Ext.getCmp('costcenterElementsPanel'), false);
                            window['CostcenterApp'].showWindow(button.getEl(), hideApply, callback);
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
                                            var nodes = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                                        
                                            var array = new Array();                                
                                            for (var i=0; i<nodes.length; i++)
                                                array.push(nodes[i].id);
                                        
                                            new Ext.data.Connection().request({
                                                url: config.app_host + '/costcenter/request/method/delete',
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
                },'-',{
                    ref: '../duplicateBtn',
                    text: bundle.getMsg('costcenter.action.duplicate'),
                    disabled: true,
                    iconCls: Ext.ux.Icon('accept'),
                    listeners: {
                        click: function(button, eventObject) {
                            var mask = new Ext.LoadMask(window['CostcenterApp'].gridPanel.getEl(), {
                                msg: bundle.getMsg('costcenter.action.copy.inprogress')+'...'
                            });
                            mask.show();
                        
                            var nodes = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                
                            var array = new Array();        
                            for (var i=0; i<nodes.length; i++)
                                array.push(nodes[i].id);
                
                            new Ext.data.Connection().request({
                                url: config.app_host + '/costcenter/request/method/duplicate',
                                params: {
                                    ids: Ext.encode(array)
                                },
                                failure: requestFailed,
                                success: requestSuccessful,
                                callback : function(options, success, response) {
                                    mask.hide();
                                    resetTree(window['CostcenterApp'].gridPanel, nodes[0], false);
                                }
                            });
                        }
                    }
                },'-',{
                    ref: '../assetsBtn',
                    disabled: true,
                    split: true,
                    text: bundle.getMsg('costcenter.action.asset'),
                    tooltip: {
                        title: bundle.getMsg('costcenter.action.asset'),
                        text: bundle.getMsg('costcenter.action.asset.comment')
                    },
                    iconCls: Ext.ux.Icon('preview-hide', 'myicons'),
                    handler: window['CostcenterApp'].movePreview.createDelegate(this, []),
                    menu:{
                        id:'costcenter-assets-menu',
                        cls:'costcenter-assets-menu',
                        width:100,
                        items: [{
                            text: bundle.getMsg('costcenter.action.asset.right'),
                            checked: false,
                            group: 'rp-group',
                            checkHandler: window['CostcenterApp'].movePreview,
                            scope: this,
                            iconCls: Ext.ux.Icon('preview-right', 'myicons')
                        },{
                            id: 'costcenterassetbottom',
                            text: bundle.getMsg('costcenter.action.asset.bottom'),
                            checked: false,
                            group: 'rp-group',
                            checkHandler: window['CostcenterApp'].movePreview,
                            scope: this,
                            iconCls: Ext.ux.Icon('preview-bottom', 'myicons')
                        },{
                            id: 'costcenterassethide',
                            text: bundle.getMsg('costcenter.action.asset.hide'),
                            checked: true,
                            group: 'rp-group',
                            checkHandler: window['CostcenterApp'].movePreview,
                            scope: this,
                            iconCls: Ext.ux.Icon('preview-hide', 'myicons')
                        }]
                    }
                },'->',new Ext.Toolbar.TextItem({
                    id: 'costcenterassetfromdatelabel',
                    text: bundle.getMsg('app.form.since')+':'
                }), {
                    xtype:'datefield',
                    vtype: 'daterange',
                    width: 90, 
                    disabled: true,
                    id: 'costcenterassetfromdate',
                    endDateField: 'costcenterassettodate'
                }, new Ext.Toolbar.TextItem({
                    id: 'costcenterassettodatelabel',
                    text: '  '+bundle.getMsg('app.form.to')+':'
                }), {
                    vtype: 'daterange',
                    xtype:'datefield',
                    width: 90, 
                    disabled: true,
                    id: 'costcenterassettodate',
                    startDateField: 'costcenterassetfromdate'
                },{
                    ref: '../consolidateBtn',
                    disabled: true,
                    text: bundle.getMsg('costcenter.action.consolidate'),
                    iconCls: Ext.ux.Icon('computer_add'),
                    handler: function(){
                        if(!Ext.getCmp('costcenterassets-right-preview').isVisible() && !Ext.getCmp('costcenterassets-bottom-preview').isVisible())
                            window['CostcenterApp'].movePreview.defer(1, this, [Ext.getCmp('costcenterassetbottom'), true]);

                        for (var i = 0; i < window['CostcenterApp'].assetGridPanel.getStore().getCount(); i++) {
                            window['CostcenterApp'].expander.collapseRow(i);
                        }

                        var nodes = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                        if (nodes.length==1)
                            window['CostcenterApp'].assetGridPanel.getStore().load({
                                params:{
                                    costcenterid: nodes[0].id,
                                    fromdate: Ext.getCmp('costcenterassetfromdate').getValue() ? Ext.getCmp('costcenterassetfromdate').getValue().format('d/m/Y') : '',
                                    todate: Ext.getCmp('costcenterassettodate').getValue() ? Ext.getCmp('costcenterassettodate').getValue().format('d/m/Y') : ''
                                }
                            });

                    }
                },'-',{
                    ref: '../expandBtn',
                    iconCls: Ext.ux.Icon('expand-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.expandall'),
                    listeners: {
                        click: function() {
                            var nodes = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                            if(nodes.length>0)
                                for(var i = 0; i < nodes.length; i++)
                                    nodes[i].expand(true);
                            else{
                                window['CostcenterApp'].gridPanel.expandAll();
                                window['CostcenterApp'].gridPanel.expandBtn.setDisabled(true);
                                window['CostcenterApp'].gridPanel.collapseBtn.setDisabled(false);
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
                            var nodes = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                            if(nodes.length>0)
                                for(var i = 0; i < nodes.length; i++)
                                    nodes[i].collapse(true);
                            else {
                                window['CostcenterApp'].gridPanel.collapseAll();
                                window['CostcenterApp'].gridPanel.expandBtn.setDisabled(false);
                                window['CostcenterApp'].gridPanel.collapseBtn.setDisabled(true);
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
                            window['CostcenterApp'].gridPanel.filters.clearFilters();
                            Ext.fly(window['CostcenterApp'].infoTextItem.getEl()).update('');
                            window['CostcenterApp'].gridPanel.getSelectionModel().clearSelections();
                        } 
                    },'-', this.infoTextItem],
                    doRefresh : function(){
                        window['CostcenterApp'].gridPanel.getRootNode().removeAll();
                        window['CostcenterApp'].gridPanel.getLoader().load(window['CostcenterApp'].gridPanel.getRootNode());
                        
                        window['CostcenterApp'].gridPanel.expandBtn.setDisabled(false);
                        window['CostcenterApp'].gridPanel.collapseBtn.setDisabled(true);
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
            
            window['CostcenterApp'].assetGridPanel = new Ext.grid.GridPanel({
                id: 'gridPanelCostcenterAssets',
                iconCls: Ext.ux.Icon('bricks'),
                autoExpandColumn: 'costcenterelementmaincolumn',
                
                region:'center',
                layout: 'fit', 
                title: config.app_showgridtitle ? bundle.getMsg("element.grid.title") : '',
                store: window['ElementApp'].comboStore,
                loadMask: true,
				
                columns: [this.expander, {
                    id:'costcenterelementmaincolumn', 
                    header: bundle.getMsg('element.field.name'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
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
            
                plugins: [this.expander],
            
                stripeRows: true,
                
                tbar:[{
                    ref: '../moveBtn',
                    text: bundle.getMsg('costcenter.action.move'),
                    iconCls: Ext.ux.Icon('building_go'),
                    disabled: true,
                    listeners: {
                        click: function(store, records, options) {
                            window['CostcenterApp'].showMovementWindow();
                        }
                    }
                },'-',{
                    ref: '../destroyBtn',
                    text: bundle.getMsg('costcenter.action.destroy'),
                    iconCls: Ext.ux.Icon('brick_delete'),
                    disabled: true,
                    listeners: {
                        click: function(store, records, options) {
                            window['CostcenterApp'].showDestroyWindow();
                        }
                    }
                },                    
                '->',{
                    ref: '../expandBtn',
                    iconCls: Ext.ux.Icon('expand-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.expandall'),
                    listeners: {
                        click: function(store, records, options) {
                            for (var i = 0; i < window['CostcenterApp'].assetGridPanel.getStore().getCount(); i++) {
                                window['CostcenterApp'].expander.expandRow(i);
                            }
                        }
                    }
                },{
                    ref: '../collapseBtn',
                    iconCls: Ext.ux.Icon('collapse-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.collapseall'),
                    listeners: {
                        click: function(store, records, options) {
                            for (var i = 0; i < window['CostcenterApp'].assetGridPanel.getStore().getCount(); i++) {
                                window['CostcenterApp'].expander.collapseRow(i);
                            }
                        }
                    }
                }],
                bbar: new Ext.PagingToolbar({
                    pageSize: parseInt(config.app_elementsongrid),
                    store: window['ElementApp'].comboStore,
                    displayInfo: true,
                    displayMsg: bundle.getMsg('app.form.bbar.displaymsg'),
                    emptyMsg: bundle.getMsg('app.form.bbar.emptymsg')
                }),
                
                listeners: {
                    render: function(gridpanel){
                        var preview = window['CostcenterApp'].assetGridPanel;
                        preview.ownerCt.hide();
                        preview.ownerCt.ownerCt.doLayout();
                    },
                    rowclick : function(grid, rowIndex, eventObject) {
                        var hasamounts = true;
                        var selectionModel = grid.getSelectionModel();

                        var records = selectionModel.getSelections();
                        window['CostcenterApp'].moveAssetsGrid.getStore().removeAll();
                        for(var i = 0; i < records.length; i++)
                            if (!records[i].get('amounts') || !records[i].get('amounts').values  || records[i].get('amounts').values.length < 1){
                                hasamounts = false;
                                continue;
                            }
                            else{
                                var record = records[i].copy();
                                record.set('amount', 1);
                                record.set('moveum', '');
                                record.set('details', '');
                                window['CostcenterApp'].moveAssetsGrid.getStore().add(record); 
                            }


                        selectionModel.grid.moveBtn.setDisabled(!hasamounts || selectionModel.getCount() < 1);
                        selectionModel.grid.destroyBtn.setDisabled(!hasamounts || selectionModel.getCount() != 1);
            

                    //var enabled = (App.isSuperAdmin() || App.isAdmin()) && selectionModel.getCount() == 1;
                    //selectionModel.grid.changePasswordBtn.setDisabled(!enabled);
                    }
                },
                sm: new Ext.grid.RowSelectionModel({
                    listeners: {
                        selectionchange : function(selectionModel) {
                            var records = selectionModel.getSelections();
                            var deleteable = true;
                            for (var i=0; i<records.length; i++){
                                if (!records[i].get('deleteable'))
                                    deleteable = false;
                            }
                            
                            if(selectionModel.grid.removeBtn)
                                selectionModel.grid.removeBtn.setDisabled(!deleteable || selectionModel.getCount() < 1);
                            if(selectionModel.grid.getBottomToolbar().deleteRowBtn)
                                selectionModel.grid.getBottomToolbar().deleteRowBtn.setDisabled(selectionModel.grid.removeBtn.disabled);
                            
                            if(selectionModel.grid.updateBtn)
                                selectionModel.grid.updateBtn.setDisabled(selectionModel.getCount() != 1);
                        }
                    }
                })
            });
            
            this.contentPanel = new Ext.Panel({  
                id: 'gridPanelCostcenter',
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
                                window['CostcenterApp'].gridPanel.getBottomToolbar().doRefresh();
                            }
                        });                        
                    }
                },
                items: [this.gridPanel,{
                    id: 'costcenterassets-bottom-preview',
                    layout:'fit',
                    items: window['CostcenterApp'].assetGridPanel,
                    height: 250,
                    minSize: 150,
                    maxSize: 350,
                    split: true,
                    border:false,
                    region:'south'
                }, {
                    id: 'costcenterassets-right-preview',
                    layout:'fit',
                    border:false,
                    region:'east',
                    width: 350,
                    minSize: 350,
                    maxSize: 600,
                    split: true,
                    hidden:true
                }]
            });
            
            this.formPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/costcenter/request/method/save',
                layout:'fit',
                keys: [formKeyMaping],	
                border:false,
                items: [new Ext.TabPanel({
                    ref: 'tabPanel',
                    defaults:{
                        autoHeight:false, 
                        border:false
                    }, 			
                    activeTab: 0,
                    border:false,
                    items:[{
                        title: bundle.getMsg('app.form.generaldata'),
                        iconCls: Ext.ux.Icon('application_view_list'),
                        frame:true,	
                        border:false,	
                        layout:'form',
                        bodyStyle:'padding:5px',
                        items: [{
                            xtype:'textfield',
                            name: 'name',
                            fieldLabel: bundle.getMsg('costcenter.field.name')+'<span style="color:red;"><sup>*</sup></span>', 
                            anchor:'-20',
                            allowBlank: false
                        }, {
                            xtype:'textarea',
                            name: 'comment',
                            fieldLabel: bundle.getMsg('costcenter.field.comment'), 
                            anchor:'-20'
                        }, new Ext.form.ComboBox({
                            fieldLabel : bundle.getMsg('costcenter.field.parent'),
                            store: this.comboStore,
                            name: 'parentid',
                            anchor:'-20',
                            emptyText: bundle.getMsg('app.form.typehere'),
                            minChars: config.app_characteramounttofind,
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
                                    delete queryEvent.combo.lastQuery;
                                    var node = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                                    if (node && node.length>0){
                                        node = node[0];
                                        
                                        var elements = new Array();
                                        var element = new Object;
                                        element.id = node.id;
                                        elements.push(element);
                                        
                                        window['CostcenterApp'].comboStore.baseParams.distinct = Ext.encode(elements);
                                    }
                                    this.setValue(queryEvent.query);
                                },
                                select: function(combo, record, index ){
                                    window['CostcenterApp'].parentRecord = record;
                                    window['CostcenterApp'].comboStore.baseParams.distinct = '';
                                    this.collapse();
                                },
                                blur: function(field) {		
                                    if(field.getRawValue() == '')
                                        window['CostcenterApp'].parentRecord = false;
                                    else {
                                        var record = field.getStore().getAt(field.getStore().findExact('name', field.getRawValue()));								 
                                        if(record && record.get('name') == field.getRawValue())
                                            window['CostcenterApp'].parentRecord = record;
                                        else 
                                            window['CostcenterApp'].parentRecord = false;
                                    }
                                    window['CostcenterApp'].comboStore.baseParams.distinct = '';
                                }
                            }
                        })]
                    },{
                        title: bundle.getMsg('element.tab.label'),
                        id: 'costcenterElementsPanel',
                        iconCls: Ext.ux.Icon('bricks'),
                        bodyStyle:'padding:5px 5px 0',
                        tbar:[new Ext.ux.form.SearchField({
                            width: 200,
                            enableKeyEvents: true,
                            store: window['ElementApp'].comboStore,
                            listeners: {
                                keyup: function(field, e) {
                                    field.onTrigger2Click();
                                    return;
                                }
                            },
                            onTrigger1Click : function(){
                                if(this.hasSearch){
                                    this.el.dom.value = '';
                                    this.triggers[0].hide();
                                    this.hasSearch = false;
                                
                                    this.store.clearFilter();
                                }
                            },
                            onTrigger2Click : function(){
                                var v = this.getRawValue();
                                if(v.length < 1){
                                    this.onTrigger1Click();
                                    return;
                                }
                        
                                this.store.filter([{
                                    property: 'name',
                                    value: v,
                                    anyMatch: true,
                                    caseSensitive: false
                                }]);
                            
                                this.hasSearch = true;
                                this.triggers[0].show();
                            }
                        })],
                        items: [{
                            xtype: 'itemselector',
                            name: 'elementsids',
                            imagePath: './js/extjs/ux/images/',
                            multiselects: [{
                                width: 180,
                                height: 170,
                                store: window['ElementApp'].comboStore,
                                legend: bundle.getMsg('app.languaje.select.available'),
                                displayField: 'name',
                                valueField: 'id'
                            },{
                                width: 180,
                                height: 170,
                                store: this.selectedElementsComboStore,
                                legend: bundle.getMsg('app.languaje.select.selected'),
                                displayField: 'name',
                                valueField: 'id'
                            }]
                        }]
                    }]
                })                      
                ]
            });	
            
            this.destroyAssetsFormPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/comprobant/request/method/destroyassets',
                frame:true,
                bodyStyle:'padding:5px 5px 0',						        
                keys: [formKeyMaping],
                items: [{
                    layout:'column',
                    items:[{
                        columnWidth:.5,
                        layout: 'form',
                        items: [new Ext.ux.form.SpinnerField({
                            id: 'costcenterdestroyamount',
                            name: 'amount',
                            fieldLabel: bundle.getMsg('app.form.amount')+'<span style="color:red;"><sup>*</sup></span>',
                            anchor: '-20',
                            minValue: 0,
                            allowDecimals: true,
                            allowBlank: false,
                            decimalPrecision: 2,
                            incrementValue: 0.5,
                            accelerate: true,
                            listeners: {
                                blur: function(field) {
                                    Ext.getCmp('costcenterdestroyumCombo').fireEvent('blur', Ext.getCmp('costcenterdestroyumCombo'));
                                }
                            }
                        })]
                    },{
                        columnWidth:.5,
                        layout: 'form',
                        items: [new Ext.form.ComboBox({
                            id: 'costcenterdestroyumCombo',
                            fieldLabel: bundle.getMsg('um.field.label')+'<span style="color:red;"><sup>*</sup></span>',
                            anchor: '-20',
                            store: window['UmApp'].comboStore,
                            listeners: {
                                focus: function(combo) {
                                    var record = window['CostcenterApp'].assetGridPanel.getSelectionModel().getSelected();
                                    combo.getStore().load({
                                        params:{
                                            filter: record.get('umid') ? '[{"type":"int","value":'+record.get('umid')+',"field":"elementid"}]' : ''
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
                                blur: function(combo) {
                                    combo.clearInvalid();
                                    
                                    var record = window['CostcenterApp'].assetGridPanel.getSelectionModel().getSelected();
                                    var amounts = record.get('amounts'); 
                                    var index = amounts.ids.indexOf(combo.getValue());
                                    
                                    if(!amounts.values || !amounts.values[index] || amounts.values[index] < Ext.getCmp('costcenterdestroyamount').getValue()){
                                        combo.markInvalid(bundle.getMsg('costcenter.action.error.noamountenought'));
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
                        })]
                    }]
                }]
            });
			
            this.moveAssetsGrid = new Ext.grid.EditorGridPanel({
                region:'center',
                layout: 'fit', 
                autoExpandColumn: 'costcentermovementmaincolumn',
                store: new Ext.data.Store({
                    reader: new Ext.data.ArrayReader({
                        idIndex: 0 
                    }, Ext.data.Record.create([{
                        name: 'id'
                    },{
                        name: 'name'
                    },{
                        name: 'amount'
                    },{
                        name: 'moveum'
                    }])
                    )
                }),
                loadMask: true,
                clicksToEdit: 1,
				
                columns: [{
                    id:'costcentermovementmaincolumn', 
                    header: bundle.getMsg('app.form.name'), 
                    width: 270, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    header: bundle.getMsg('app.form.amount'), 
                    width: 90, 
                    sortable: true, 
                    dataIndex: 'amount',
                    editor: new Ext.ux.form.SpinnerField({
                        minValue: 0,
                        allowDecimals: true,
                        allowBlank: false,
                        decimalPrecision: 2,
                        incrementValue: 0.5,
                        accelerate: true
                    })
                },{
                    header: bundle.getMsg('um.field.label'), 
                    width: 150, 
                    sortable: true, 
                    dataIndex: 'moveum',
                    renderer : function(val) {
                        var record = window['UmApp'].comboStore.getAt(window['UmApp'].comboStore.find('id',val, 0, true, true));
                        val = '';
                        if(record && record.get('name')!='')
                            val = record.get('name');
                        return val;
                    },
                    editor:  new Ext.form.ComboBox({
                        width: 90,
                        store: new Ext.data.Store(),
                        listeners: {
                            focus: function(combo) {
                                var record = window['CostcenterApp'].moveAssetsGrid.getSelectionModel().getSelected();
                                combo.getStore().removeAll();
                                for(var i = 0; i < record.get('amounts').ids.length; i++){
                                    var r = window['UmApp'].comboStore.getAt(window['UmApp'].comboStore.find('id', record.get('amounts').ids[i], 0, true, true));
                                    combo.getStore().add(r.copy());
                                }
                            }
                        },
                        valueField: 'id',    
                        displayField: 'name',
                        tpl: '<tpl for="."><div ext:qtip="<b>{name}</b>: {comment}" class="x-combo-list-item">{name}</div></tpl>',
                        typeAhead: true,
                        mode: 'local',
                        triggerAction: 'all',
                        selectOnFocus:true,
                        forceSelection:true,
                        allowBlank: false,
                        emptyText: bundle.getMsg('app.form.select')
                    })
                }],
            
                tbar: [new Ext.Toolbar.TextItem(bundle.getMsg('costcenter.field.label')+'<span style="color:red;"><sup>*</sup></span>'+': '),new Ext.ux.TreeCombo({
                    id: 'costcentermovetoccTreeCombo',
                    emptyText: bundle.getMsg('app.form.select'),
                    typeAhead: true,
                    valueField: 'id',    
                    displayField: 'name',
                    triggerAction:'all',
                    width: 150, 
                    maxHeight: 225,
                    treeWidth: 225,
                    root: new Ext.tree.AsyncTreeNode({
                        text: 'root',
                        id:'NULL'
                    }),
                    rootVisible: false,
                    loader: new Ext.tree.TreeLoader({
                        dataUrl: config.app_host + '/costcenter/request/method/load/component/tree',
                        listeners: {
                            load: function(treeLoader, node, response){
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
                                    if(node.childNodes[i].attributes.comment && node.childNodes[i].attributes.comment != '')
                                        node.childNodes[i].setTooltip(node.childNodes[i].attributes.comment, node.childNodes[i].attributes.name);
                
                                    node.childNodes[i].setIconCls(Ext.ux.Icon('building'));
                                    if(node.childNodes[i].leaf == 1)
                                        node.childNodes[i].setIconCls(Ext.ux.Icon('building'));
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
                })],
				
                stripeRows: true,
				
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect:true
                }),
                
                view: new Ext.grid.GridView({
                    markDirty: false,
                    forceFit:true
                }),
                
                listeners: {
                    afteredit: function(e){
                        window['CostcenterApp'].moveAssetsGrid.reconfigure(
                            window['CostcenterApp'].moveAssetsGrid.getStore(), 
                            window['CostcenterApp'].moveAssetsGrid.getColumnModel()
                            );
                    }
                }
            });
        
        },
        
        showMovementWindow : function(){
            window['CostcenterApp'].window = App.showWindow(bundle.getMsg("costcenter.action.move"), 460, 350, window['CostcenterApp'].moveAssetsGrid, 
                function(){
                    var isvalid = true;
                    var record = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                    if(record.length>0)
                        record = record[0];
                    // validating "from costcenter"
                    if(!record || !record.id || record.id == ''){
                        Ext.Msg.show({
                            title:bundle.getMsg('app.msg.error.title'),
                            msg:  bundle.getMsg('costcenter.action.error.nofromcostcenter'),
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });

                        isvalid = false;
                        return;
                    }
                    
                    var node = Ext.getCmp('costcentermovetoccTreeCombo').getSelectedNode(Ext.getCmp('costcentermovetoccTreeCombo').getValue());
                
                    // validating "to costcenter"
                    if(!node || !node.id || node.id == '' || node.id == 'NULL'){
                        Ext.Msg.show({
                            title:bundle.getMsg('app.msg.error.title'),
                            msg:  bundle.getMsg('costcenter.action.error.notocostcenter'),
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                        Ext.getCmp('costcentermovetoccTreeCombo').markInvalid(bundle.getMsg('costcenter.action.error.notocostcenter'));

                        isvalid = false;
                        return;
                    }
                
                    // validating elements
                    if(window['CostcenterApp'].moveAssetsGrid.getStore().getCount() < 1){
                        Ext.Msg.show({
                            title:bundle.getMsg('app.msg.error.title'),
                            msg:  bundle.getMsg('costcenter.action.error.noelements'),
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                        isvalid = false;
                        return;
                    }
                    
                    var elements = new Array();
                    window['CostcenterApp'].moveAssetsGrid.getStore().each(function(record){
                        var index = 0;
                        if(record.get('moveum') && record.get('moveum')!=''){
                            var amounts = record.get('amounts');  
                            if(!amounts || !amounts.ids || !amounts.values || amounts.values[amounts.ids.indexOf(record.get('moveum'))] < record.get('amount')){
                                index = window['CostcenterApp'].moveAssetsGrid.getStore().find('id', record.get('id'), 0, true, true);
                                if(index>-1)
                                    window['CostcenterApp'].moveAssetsGrid.startEditing(index, 1);
                                isvalid = false;
                                return;
                            }
                            else{
                                var v = record.copy();
                                v.set('details', '');
                                v.set('amounts', '');
                                elements.push(v.data);
                            }
                        }
                        else{   
                            index = window['CostcenterApp'].moveAssetsGrid.getStore().find('id', record.get('id'), 0, true, true);
                            if(index>-1)
                                window['CostcenterApp'].moveAssetsGrid.startEditing(index, 2);
                            isvalid = false;
                            return;
                        }
                    });
                    
                    if(isvalid){
                        var mask = new Ext.LoadMask(window['CostcenterApp'].moveAssetsGrid.getEl(), {
                            msg: bundle.getMsg('costcenter.action.move.inprogress')+'...'
                        });
                        mask.show();

                        new Ext.data.Connection().request({
                            url: config.app_host + '/comprobant/request/method/moveassets',
                            params: {
                                from: record ? record.id : '',
                                to: node ? node.id : '',
                                elements: Ext.encode(elements),
                                entityid: config.multientityapp ? config.app_entityid : ''
                            },
                            failure: requestFailed,
                            success: requestSuccessful,
                            callback : function(options, success, response) {
                                Ext.getCmp('costcentermovetoccTreeCombo').reset();
                                window['CostcenterApp'].moveAssetsGrid.getStore().removeAll();
                    
                                var node = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                                if(node && node.length>0){
                                    for (var i = 0; i < window['CostcenterApp'].assetGridPanel.getStore().getCount(); i++) 
                                        window['CostcenterApp'].expander.collapseRow(i);
        
                                    node = node[0];
                                    window['CostcenterApp'].assetGridPanel.getStore().load({
                                        params:{
                                            costcenterid: node.id,
                                            fromdate: Ext.getCmp('costcenterassetfromdate').getValue() ? Ext.getCmp('costcenterassetfromdate').getValue().format('d/m/Y') : '',
                                            todate: Ext.getCmp('costcenterassettodate').getValue() ? Ext.getCmp('costcenterassettodate').getValue().format('d/m/Y') : ''
                                        }
                                    });
                                }
                    
                                mask.hide();
                                window['CostcenterApp'].window.hide();
                                
                            //submitFormSuccessful('CostcenterApp', form, action, button, !node, cancelFn, callback);
                            }
                        });
                    }
                }, 
                function(){
                    Ext.getCmp('costcentermovetoccTreeCombo').reset();
                    window['CostcenterApp'].moveAssetsGrid.getStore().removeAll();    
                    window['CostcenterApp'].window.hide();
                }, 
                Ext.getBody(),
                false,
                false,
                false,
                true);
        },
        loadFormElements : function(component, elements){
            var mask = false;
            if(component && component.getEl()){
                mask = new Ext.LoadMask(component.getEl(), {
                    msg: bundle.getMsg('app.layout.loading')+'...'
                });
                mask.show();
            }
            window['ElementApp'].comboStore.load({
                params:{
                    limit: ''
                },
                callback: function(records, options, success ){
                    if(elements){
                        for(var i = 0; i < elements.length; i++){
                            var index = window['ElementApp'].comboStore.find('id', elements[i].id);
                            window['CostcenterApp'].selectedElementsComboStore.add(window['ElementApp'].comboStore.getAt(index));  
                            window['ElementApp'].comboStore.removeAt(index);
                        }
                    }
                    if(mask)
                        mask.hide();
                }
            });
        },
        
        showDestroyWindow : function(){
            window['CostcenterApp'].window = App.showWindow(bundle.getMsg("costcenter.action.destroy"), 280, 140, window['CostcenterApp'].destroyAssetsFormPanel,
                function(){
                    var record = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                    if(record.length>0)
                        record = record[0];
                    
                    var element = window['CostcenterApp'].assetGridPanel.getSelectionModel().getSelected();

                    window['CostcenterApp'].destroyAssetsFormPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        //submitEmptyText: false,
                        params: {
                            costcenterid: record ? record.id : '',
                            elementid: element.get('id'),
                            umid: Ext.getCmp('costcenterdestroyumCombo').getValue(),
                            entityid: config.multientityapp ? config.app_entityid : ''
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);   
    
                            loadFormSuccessful(form, action); 
    
                            var node = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                            if(node && node.length>0){
                                for (var i = 0; i < window['CostcenterApp'].assetGridPanel.getStore().getCount(); i++) 
                                    window['CostcenterApp'].expander.collapseRow(i);
        
                                node = node[0];
                                window['CostcenterApp'].assetGridPanel.getStore().load({
                                    params:{
                                        costcenterid: node.id,
                                        fromdate: Ext.getCmp('costcenterassetfromdate').getValue() ? Ext.getCmp('costcenterassetfromdate').getValue().format('d/m/Y') : '',
                                        todate: Ext.getCmp('costcenterassettodate').getValue() ? Ext.getCmp('costcenterassettodate').getValue().format('d/m/Y') : ''
                                    }
                                });
                            }
    
                            window['CostcenterApp'].window.hide();
                        },
                        failure: loadFormFailed
                    });
                }, 
                function(){
                    window['CostcenterApp'].window.hide();
                }, 
                Ext.getBody(),
                false,
                false,
                false,
                true);
        },
        
        showWindow : function(animateTarget, hideApply, callback){        
            var cancelFn = function(){
                window['CostcenterApp'].parentRecord = false;
                
                var node = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                if(node && node.length>0){
                    node = node[0];
                    window['CostcenterApp'].gridPanel.expandBtn.setDisabled(false);
                    resetTree(window['CostcenterApp'].gridPanel, node, false);
                }
            };
            window['CostcenterApp'].window = App.showWindow(bundle.getMsg('costcenter.window.title'), 420, 310, window['CostcenterApp'].formPanel, 
                function(button){
                    var nodes = window['CostcenterApp'].gridPanel.getSelectionModel().getSelectedNodes();
                    var node = false;
                    if(nodes && nodes.length>0)
                        node = nodes[0];
                    window['CostcenterApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        //submitEmptyText: false,
                        params: {
                            id: node ? node.id:'',
                            responsible_id: window['CostcenterApp'].responsibleRecord ? window['CostcenterApp'].responsibleRecord.id :'',
                            parent_id: window['CostcenterApp'].parentRecord ? window['CostcenterApp'].parentRecord.id :'',
                            path: window['CostcenterApp'].parentRecord ? window['CostcenterApp'].parentRecord.data.path : window['CostcenterApp'].gridPanel.getRootNode().getPath(),
                            entityid: config.multientityapp ? config.app_entityid : ''
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);     
                            if(node)
                                window['CostcenterApp'].gridPanel.expandBtn.setDisabled(false);
                                
                            resetTree(window['CostcenterApp'].gridPanel, node, window['CostcenterApp'].parentRecord ? window['CostcenterApp'].parentRecord : false);
                            
                            submitFormSuccessful('CostcenterApp', form, action, button, !node, cancelFn, callback);
                        },
                        failure: loadFormFailed
                    });
                }, 
                function(){
                    cancelFn();
                    window['CostcenterApp'].window.hide();
                }, 
                animateTarget,
                false,
                false,
                false,
                hideApply ? hideApply : false);
        },
        
        movePreview : function(m, pressed){
            if(!m){ // cycle if not a menu item click
                var items = Ext.menu.MenuMgr.get('costcenter-assets-menu').items.items;
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
                var preview = window['CostcenterApp'].assetGridPanel;
                var right = Ext.getCmp('costcenterassets-right-preview');
                var bot = Ext.getCmp('costcenterassets-bottom-preview');
                var btn = window['CostcenterApp'].gridPanel.assetsBtn;
                switch(m.text){
                    case bundle.getMsg('costcenter.action.asset.bottom'):
                        right.hide();
                        bot.add(preview);
                        bot.show();
                        bot.ownerCt.doLayout();
                        btn.setIconClass(Ext.ux.Icon('preview-bottom', 'myicons'));
                        break;
                    case bundle.getMsg('costcenter.action.asset.right'):
                        bot.hide();
                        right.add(preview);
                        right.show();
                        right.ownerCt.doLayout();
                        btn.setIconClass(Ext.ux.Icon('preview-right', 'myicons'));
                        break;
                    case bundle.getMsg('costcenter.action.asset.hide'):
                        preview.ownerCt.hide();
                        preview.ownerCt.ownerCt.doLayout();
                        btn.setIconClass(Ext.ux.Icon('preview-hide', 'myicons'));
                        break;
                }
            }
        },
        
        applySecurity : function(groups, permissions){
            window['CostcenterApp'].gridPanel.addBtn.setVisible(permissions.indexOf('managecostcenter') != -1 || permissions.indexOf('managecostcenteradd') != -1);
            window['CostcenterApp'].gridPanel.updateBtn.setVisible(permissions.indexOf('managecostcenter') != -1 || permissions.indexOf('managecostcenteredit') != -1);
            window['CostcenterApp'].gridPanel.removeBtn.setVisible(permissions.indexOf('managecostcenter') != -1 || permissions.indexOf('managecostcenterdelete') != -1);            
            window['CostcenterApp'].gridPanel.duplicateBtn.setVisible(permissions.indexOf('managecostcenter') != -1 || permissions.indexOf('managecostcenterdelete') != -1);            
            
            var consolidable = permissions.indexOf('managecostcenter') != -1 || permissions.indexOf('managecostcenterconsolidate') != -1;
            window['CostcenterApp'].gridPanel.consolidateBtn.setVisible(consolidable);            
            
            Ext.getCmp('costcenterassetfromdatelabel').setVisible(consolidable);
            Ext.getCmp('costcenterassetfromdate').setVisible(consolidable);
            Ext.getCmp('costcenterassettodatelabel').setVisible(consolidable);
            Ext.getCmp('costcenterassettodate').setVisible(consolidable);
        }
    }
}();

