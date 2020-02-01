import React, { Component } from 'react';
import CheckboxTree from 'react-checkbox-tree'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './foldertree.scss';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import SortableTree, {
    addNodeUnderParent,
    getNodeAtPath,
    removeNode,
    removeNodeAtPath
} from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import 'react-sortable-tree/style.css';
import TextField from '@material-ui/core/TextField';

const nodes = [
    {   id: 1,
        value: 'refixd',
        label: 'Refixd',
        children: [
        { value: 'phobos', label: 'Phobos'},
        { value: 'domino', label: 'Domino'},
        { value: 'pizza', label: 'Pizza'}
        ]
    },
    {   id:2,
        value:'lenovo',
        label: 'lenovo',
        children:[
        { value: 'computer',label: 'computer'},
        { value: 'hello',label: 'Hello'},
        { value: 'hai',label: 'Hai'}
        ]
    },
    {   id:3,
        value:'dell',
        label: 'dell',
        children:[
        { value: 'desktop',label: 'desktop'},
        { value: 'hiphop',label: 'Hiphop'},
        { value: 'rap',label: 'Rap'}
        ]
    }
];
let node = 'fa fa-folder-o SorCheckbox'
let service = 'fa fa-cogs SorCheckbox'
let user = 'fa fa-file  SorCheckbox'
// const treeData= [{ 
//     title: 'Chicken',
//     className: node, 
//     children: [
//         { title: 'Egg', className: user},
//         { title: 'Hen', className: user},
//         { title: 'Duck', className: user}
//     ]
// },
// { 
//     title: 'Fish', 
//     className: node,
//     children: [
//         { title: 'Raw fish', className: user },
//         { title: 'Bluewhale', className: user },
//         { title: 'Dolphin', className: user }
//     ] 
// }];


export default class foldertree extends Component {
    constructor(props){
        super(props);
        this.state={
            checked: [],
            expanded: [],
            isEnable:false,
            // checked: [],
            // treeData,
            searchQuery: null,
            searchValue: '',
            treeData: [{
                title: 'Chicken',
            className: node, 
            children: [
                { title: 'Egg', className: user},
                { title: 'Hen', className: user},
                { title: 'Duck', className: user}
            ]
        },
        { 
            title: 'Fish', 
            className: node,
            children: [
                { title: 'Raw fish', className: user },
                { title: 'Bluewhale', className: user },
                { title: 'Dolphin', className: user }
            ] 
        },
        { 
            title: 'Crabs', 
            className: node,
            children: [
                { title: 'Raw fish', className: user },
                { title: 'Bluewhale', className: user },
                { title: 'Dolphin', className: user}
            ] 
        },
        ]
        }
        this.clcik = this.clcik.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.addNode = this.addNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.updateTreeData = this.updateTreeData.bind(this);
    }
    clcik(){
        alert("nnana")
    }
    handleSearchChange(e){
        this.setState({
            searchValue:e.target.value
        })
    }
    addNode(rowInfo){
        let NEW_NODE = {title: ''};
        let {node, treeIndex, path} = rowInfo;
        path.pop();
        let parentNode = getNodeAtPath({
            treeData: this.state.treeData,
            path : path,
            getNodeKey: ({ treeIndex }) =>  treeIndex,
            ignoreCollapsed : true
        });
        let getNodeKey = ({ node: object, treeIndex: number }) => {
            return number;
        };
        let parentKey = getNodeKey(parentNode);
        if(parentKey == -1) {
            parentKey = null;
        }
        let newTree = addNodeUnderParent({
                treeData: this.state.treeData,
                newNode: NEW_NODE,
                expandParent: true,
                parentKey: parentKey,
                getNodeKey: ({ treeIndex }) =>  treeIndex
         });
         this.setState({treeData: newTree.treeData});
    }
    removeNode(rowInfo) {
        let {node, treeIndex, path} = rowInfo;
        removeNodeAtPath({
                       treeData: this.state.treeData,
                       path: path,   // You can use path from here
                       getNodeKey: ({node: TreeNode, treeIndex: number}) => {
                           console.log(number);
                           return number;
                       },
                  ignoreCollapsed: false,
               })
    }
    updateTreeData(treeData) {
        this.setState({ treeData });
    }
    render() {
        return (
            <div className="FolderTree">
                <CheckboxTree
                onClick={this.clcik}
                nodes={nodes}
                checked={this.state.checked}
                expanded={this.state.expanded}
                onCheck={checked => this.setState({ checked })}
                onExpand={expanded => this.setState({ expanded })}
                icons={{
                    check: <span><i className="fa fa-check-square-o checkBox"></i></span>,
                    uncheck: <span><i className="fa fa-square-o checkBox"></i></span>,
                    halfCheck: <span><i className="fa fa-check-square-o checkBox"></i></span>,
                    expandClose: <span><i className="fa fa-caret-down arrowButtons"></i></span>,
                    expandOpen: <span><i className="fa fa-caret-right arrowButtons"></i></span>,
                    expandAll: <span><i className="fa fa-caret-right arrowButtons"></i></span>,
                    collapseAll: <span><i className="fa fa-caret-down arrowButtons"></i></span>,
                    // parentClose: <span><i class="fa fa-folder-o"></i></span>,
                    // parentOpen:  <span><i class="fa fa-folder-open-o"></i></span>,
                    leaf: <span><i className="fa fa-file fileIcon"></i></span>,
                }}
                iconsClass="fa5"
                // disabled={isEnable => this.setState({
                //     isEnable: false
                // })}
            />
            <div className="sortableTree">
                {/* <div>
                    <input type="search" onChange={this.handleSearchChange} />
                </div> */}
                <SortableTree
                    treeData={this.state.treeData}
                    // onChange={treeData => this.setState({ treeData })}
                    theme={FileExplorerTheme}
                    checked={this.state.checked}
                    canDrag={this.state.isEnable}
                    canDrop={this.state.isEnable}
                    generateNodeProps = {
                         ({ node }) => ({
                            title: (
                            <div>
                                <input type="checkbox" className="checkBox" />
                                <span><i className={node.className}></i><span className="titleName">{node.title}</span></span>
                            </div>),
                            }),
                            rowInfo => ({
                            buttons: [
                                <div>
                                {/* <TextField 
                                 hintText=""
                                 multiLine={true}
                                 rows={1}
                                 rowsMax={4}
                                /> */}
                                <button onClick={(event) => this.addNode(rowInfo)}>add</button>
                                <button onClick={(event) => this.removeNode(rowInfo)}>del</button>
                                </div>
                            ],
                        })
                    }
                    searchQuery={this.state.searchQuery}
                    onChange={this.updateTreeData}
                />
            </div>
            </div>
        )
    }
}


