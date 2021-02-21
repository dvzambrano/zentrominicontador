/**
 * Codigo fuente generado por el SGArqBase: Plataforma de construcción de Sistemas.
 *
 * @package    SGArqBase
 * @subpackage testing
 * @author     MSc. Donel Vázquez Zambrano
 * @version    1.0.0
 */

TestingApp = function() {
    return {
        init : function(TestingApp) {
			
            this.store = new Ext.data.GroupingStore({
                url: config.app_host + '/testing/request/method/load',
                baseParams:{
                    component: 'grid',
                    
                    start: 0,
                    limit: config.app_elementsongrid
                },
                reader: new Ext.data.JsonReader(),
                listeners: {
                    load: config.app_showmessageonstoreloadsuccessful ? loadStoreSuccessful : function(){},
                    loadexception: config.app_showmessageonstoreloadfailed ? loadStoreFailed : function(){}
                }
            });
            
            this.comboStore = new Ext.data.Store({
                url: config.app_host + '/testing/request/method/load',
                baseParams:{
                    component: 'combo'
                },
                reader: new Ext.data.JsonReader()
            });
			
            
			
            this.gridPanel = new Ext.ux.tree.TreeGrid({
                id: 'gridPanelTesting',
                rootVisible:false,
                iconCls: Ext.ux.Icon('flag_orange'),
							
                region:'center',
                title: config.app_showgridtitle ? bundle.getMsg("testing.grid.title") : '',
                autoExpandColumn: 'testingcolname',
                enableDD: false,
                useArrows: false,
                lines: true,
                containerScroll: true,
                animate: true,
                maskConfig: {
                    msg: bundle.getMsg("app.layout.loading")+'...'
                },

                tools:[{
                    id:'refresh',
                    handler:function(event,toolEl,panel,tc){
                        window['TestingApp'].gridPanel.getRootNode().removeAll();
                        window['TestingApp'].gridPanel.getLoader().load(window['TestingApp'].gridPanel.getRootNode())
                    }
                },{
                    id:'print',
                    qtip: bundle.getMsg('app.languaje.report.printview'),
                    handler: function(button, eventObject) {
                        App.printView(window['TestingApp'].gridPanel);
                    }
                }],
				
                columns: [{id:'testingcolname', 
                    header: bundle.getMsg('testing.field.code'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'code'
                },{
                    header: bundle.getMsg('testing.field.name'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'name'
                },{
                    header: bundle.getMsg('testing.field.nick'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'nick'
                },{
                    header: bundle.getMsg('testing.field.comment'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'comment'
                },{
                    header: bundle.getMsg('testing.field.parentid'), 
                    width: 160, 
                    sortable: true, 
                    dataIndex: 'parentid'
                }],
				
                selModel: new Ext.tree.MultiSelectionModel({
                    listeners: {
                        selectionchange : function(selectionModel, nodes) {
                            window['TestingApp'].gridPanel.removeBtn.setDisabled(nodes.length < 1);
                            window['TestingApp'].gridPanel.updateBtn.setDisabled(selectionModel.getSelectedNodes().length != 1);
                        }
                    }
                }),
				
                root: new Ext.tree.AsyncTreeNode({
                    text: 'root',
                    id:'NULL'
                }),
                
                listeners: {
                    beforeexpandnode: function(node, deep, anim){
                        if(window['TestingApp'].gridPanel.collapseBtn.disabled)
                            window['TestingApp'].gridPanel.collapseBtn.setDisabled(false);
                        
                        if(!node.leaf)
                            node.setIconCls(Ext.ux.Icon(window['TestingApp'].iconOpen, 'famfamfam'));
                    },
                    beforecollapsenode: function(node, deep, anim){
                        if(window['TestingApp'].gridPanel.expandBtn.disabled)
                            window['TestingApp'].gridPanel.expandBtn.setDisabled(false);
                        node.setIconCls(Ext.ux.Icon(window['TestingApp'].iconParent, 'famfamfam'));
                    }
                },
				
                loader: new Ext.tree.TreeLoader({
                    baseParams: {
                        component: 'tree',
                        start: 0
                    },
                    dataUrl: config.app_host + '/testing/request/method/load',
                    listeners: {
                        load: function(treeLoader, node, response){
                            if(response.responseText.indexOf('signinForm')>0)
                                showSesionExpiredMsg();                            
                            
                            for(var i = 0; i < node.childNodes.length; i++)
                                if(node.childNodes[i].leaf)
                                    node.childNodes[i].setIconCls(Ext.ux.Icon(window['TestingApp'].iconLeaf, 'famfamfam'));
                                else
                                    node.childNodes[i].setIconCls(Ext.ux.Icon(window['TestingApp'].iconParent, 'famfamfam'));
                        }
                    }
                }),
				
                tbar: [{
                    text: bundle.getMsg('app.form.add'),
                    iconCls: Ext.ux.Icon('add'),
                    ref: '../addBtn',
                    listeners: {
                        click: function(button, eventObject) {
                            window['TestingApp'].gridPanel.getSelectionModel().clearSelections();
                            window['TestingApp'].gridPanel.updateBtn.fireEvent('click', window['TestingApp'].gridPanel.updateBtn);
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
                            var nodes = window['TestingApp'].gridPanel.getSelectionModel().getSelectedNodes();
                            if (nodes.length == 1){
                                var dr = new Ext.data.Record({
                                    code: nodes[0].attributes.code,
                                    name: nodes[0].attributes.name,
                                    nick: nodes[0].attributes.nick,
                                    comment: nodes[0].attributes.comment,
                                    parentid: nodes[0].attributes.parentid
                                });

                                if (!window['TestingApp'].parentRecord){
                                    window['TestingApp'].parentRecord = new Object;
                                    window['TestingApp'].parentRecord.data = new Object;
                                }
                                window['TestingApp'].parentRecord.id = nodes[0].attributes.parentid;
                                window['TestingApp'].parentRecord.data.path = nodes[0].parentNode.getPath();
                                window['TestingApp'].formPanel.getForm().loadRecord(dr);
                            }
                            window['TestingApp'].showWindow(button.getEl());
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
                            Ext.Msg.show({
                                title: bundle.getMsg('app.msg.warning.title'),
                                msg: bundle.getMsg('app.msg.warning.deleteselected.text'),
                                buttons: Ext.Msg.YESNO,
                                fn: function(btn, text){
                                    if (btn == 'yes'){
                                        var nodes = window['TestingApp'].gridPanel.getSelectionModel().getSelectedNodes();
									
                                        var array = new Array();                                
                                        for (var i=0; i<nodes.length; i++)
                                            array.push(nodes[i].id);
											
                                        new Ext.data.Connection().request({
                                            url: config.app_host + '/testing/request/method/delete',
                                            params: {
                                                ids: Ext.encode(array)
                                            },
                                            failure: requestFailed,
                                            success: requestSuccessful,
                                            callback : function(options, success, response) {
                                                for (var i=0; i<nodes.length; i++){
                                                    nodes[i].unselect();
                                                    Ext.fly(nodes[i].ui.elNode).ghost('l', {
                                                        callback: nodes[i].remove, 
                                                        scope: nodes[i], 
                                                        duration: .4
                                                    });
                                                }
                                            }
                                        });
                                    }
                                },
                                animEl: 'elId',
                                icon: Ext.MessageBox.QUESTION
                            });
                        }
                    }
                },'->','-',{
                    ref: '../expandBtn',
                    iconCls: Ext.ux.Icon('expand-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.expandall'),
                    listeners: {
                        click: function(store, records, options) {
                            window['TestingApp'].gridPanel.expandAll();
                        }
                    }
                },{
                    ref: '../collapseBtn',
                    iconCls: Ext.ux.Icon('collapse-all', 'myicons'),
                    tooltip: bundle.getMsg('app.form.collapseall'),
                    listeners: {
                        click: function(store, records, options) {
                            window['TestingApp'].gridPanel.collapseAll();
                        }
                    }
                }],
				
                bbar: new Ext.PagingToolbar({
                    pageSize: Number.MAX_VALUE,
                    disabled: true,                    
                    store: this.store,
                    items:[],
                    doRefresh : function(){
                        window['TestingApp'].gridPanel.getLoader().load(window['TestingApp'].gridPanel.getRootNode());
                    },
                    displayInfo: true,
                    displayMsg: ' ',
                    emptyMsg: ' '
                })
            });
            
            this.iconParent = 'book';
            this.iconLeaf = 'book';
            this.iconOpen = 'book_open';
			
            this.formPanel = new Ext.FormPanel({
                labelWidth: 75,
                labelAlign: 'top',
                url: config.app_host + '/testing/request/method/save',
                frame:true,
                bodyStyle:'padding:5px 5px 0',						        
                keys: [formKeyMaping],
                items: [{
                    xtype:'textfield',
                    name: 'code',
                    fieldLabel: bundle.getMsg('testing.field.code'), 
                    anchor:'-20'
                },{
                    xtype:'textfield',
                    name: 'name',
                    fieldLabel: bundle.getMsg('testing.field.name'), 
                    anchor:'-20'
                },{
                    xtype:'textfield',
                    name: 'nick',
                    fieldLabel: bundle.getMsg('testing.field.nick'), 
                    anchor:'-20'
                },{
                    xtype:'textfield',
                    name: 'comment',
                    fieldLabel: bundle.getMsg('testing.field.comment'), 
                    anchor:'-20'
                },{
                    xtype:'textfield',
                    name: 'parentid',
                    fieldLabel: bundle.getMsg('testing.field.parentid'), 
                    anchor:'-20'
                }]
            });
            
        },
        
        showWindow : function(animateTarget){
            App.showWindow(bundle.getMsg('testing.window.title'), 370, 230, this.formPanel, 
                function(button, eventObject, callback){
                    if(!button){
                        button = new Object;
                        button.id = 'submitBtn';
                    }
                
                    var records = window['TestingApp'].gridPanel.getSelectionModel().getSelectedNodes();
							
                    window['TestingApp'].formPanel.getForm().submit({
                        waitTitle : bundle.getMsg('app.msg.wait.title'), 
                        waitMsg: bundle.getMsg('app.msg.wait.text'), 
                        clientValidation: true,
                        //submitEmptyText: false,
                        params: {
                            
                            id: records[0] ? records[0].get('id'):''
                        },
                        success: function(form, action) {
                            checkSesionExpired(form, action);
                            window['TestingApp'].store.load({
                                params:{
                                    start: window['TestingApp'].gridPanel.getBottomToolbar().cursor
                                }
                            });
                            
                            if(button.id == 'submitBtn' || (button.id == 'applyBtn' && !records[0])){
                                loadFormSuccessful(form, action);                                
                                if(callback)
                                    callback();
                            }
                        },
                        failure: loadFormFailed
                    });
                
                }, 
                function(){
                    window['TestingApp'].formPanel.getForm().reset();
                    App.window.hide();
                }, 
                animateTarget);
        },
        
        applySecurity : function(groups, permissions){
            
        }
    }
}();

