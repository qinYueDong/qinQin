const {Component,Fragment}=React;
let that;
class ToDoList extends Component {
    constructor(props) {
        super(props);
        that=this;
        this.state = {
            list: ["吃饭", "睡觉", "上厕所"],
            inputValue: "秦岳东"
        }
    }



    add(value) {
        this.setState({
            inputValue:value
        });
        if(value!=""){
            this.setState({
                list: [...this.state.list, value]
            })
        }
    }

    deleteItem(index) {
        let list = [...this.state.list];
        list.splice(index, 1);
        this.setState({
            list
        })
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row" style={{margin: "30px auto 20px"}}>
                        <div className="col-md-12">
                            <div className="input-group">
                               <ToDoInput placeholder="请输入您的事项" value={this.state.inputValue}
                                           addItem={(value)=>this.add(value)}></ToDoInput>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ul>
                                {
                                    this.state.list.map((item, index) => {
                                        return (
                                              <ToDoItem title={item} index={index} key={index}
                                                        deleteItem={()=>this.deleteItem(index)} ></ToDoItem>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
class ToDoItem extends Component{
    render(){
        return (
            <Fragment>
                <li className="display-flex align-items-center"
                    style={{marginBottom: "10px"}}>
                    <span className="delete" style={{marginRight:"5px"}} onClick={()=>this.deleteItem()}>&times;
                    </span>
                    {this.props.title}
                </li>
            </Fragment>
        )
    }
    deleteItem(){
        const {index,deleteItem} =this.props;
        deleteItem(index)
    }
}
class ToDoInput extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        }
    }
    render(){
        const {placeholder}=this.props;
        return (
            <Fragment>
                <input type="text" value={this.state.inputValue} placeholder={placeholder}
                       className="form-control"
                       onChange={()=>this.inputChange(event)}/>
                <div className="input-group-btn">
                    <button onClick={()=>this.add()} className="btn btn-primary">添加</button>
                </div>
            </Fragment>
        )
    }
    componentDidMount(){
        this.setState({
            inputValue:this.props.value
        })
    }
    inputChange(e){
        const inputValue=e.target.value;
       this.setState({
           inputValue
       });
    }
    add(){
        this.props.addItem(this.state.inputValue);
        this.setState({
            inputValue:""
        })
    }
}

ReactDOM.render(
    <div>
        <ToDoList></ToDoList>
    </div>,
    document.querySelector("#app")
);


