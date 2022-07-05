//class Components
// import { Component } from 'react';

//functional Components
import { useState, useEffect } from 'react'
import './App.css';
import CardList from './Components/CardLists/CardLists'
import SearchBox from './Components/SearchBox/SearchBox'

const App = () => {
  const [searchValue,setSearchValue]=useState('');
  const [monsters,setMonsters]=useState([]);
  //優化過濾項目
  const [filterMonsters,setFilterMonster]=useState(monsters)

  //初始化打api請求資料
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json() )
    .then(users => setMonsters(users) )

  },[])

  //優化“篩選資料”減少不必要的渲染
  useEffect(()=>{
    const newFilterMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchValue)
      });
      setFilterMonster(newFilterMonsters)
  },[monsters,searchValue])

  const onSearchChange = (e) => {
          const searchStrings = e.target.value.toLocaleLowerCase()
          setSearchValue(searchStrings) 
        };
        
  
  return(
    <div className="App">
      <h1 className='app-title'>Monster Project</h1>
        <SearchBox 
                className='search-box'
                onChangeHandler={onSearchChange} 
                placeholder='search monster...'
            />

        <CardList monsters={filterMonsters}/>
    </div>
  )
}

//class Components寫法
// class App extends Component {
//     constructor(){
//       super()
//       this.state = {
//         monsters: [],
//         searchStrings:''
//       };
//     }
//     componentDidMount(){
//       fetch('https://jsonplaceholder.typicode.com/users')
//           .then(response=>response.json())
//           .then(users=>this.setState(() => {return {monsters:users}}))
//     }
//     //1.優化event，初始化建立後不會註銷
//     onSearchChange = (e) => {
//       const searchStrings = e.target.value.toLocaleLowerCase()
//       this.setState(()=>{ return {searchStrings}})
//     };

//     render(){
//       //2.優化重複寫this,this.state的問題
//         const { monsters, searchStrings } = this.state;
//         const { onSearchChange } = this;

//         const filterMonsters = monsters.filter((monster)=>{
//           return monster.name.toLocaleLowerCase().includes(searchStrings)
//         });

//         return(
//             <div className="App">
//                 {/* <input 
//                     className='serch-box' 
//                     type='search' 
//                     placeholder='Search Monster...'
//                     onChange={
//                       //這裡若是寫成匿名函數()=>{}，會造成rerender會不斷重新初始化建立匿名函數
//                       onSearchChange
//                     }
//                   /> */}
//             {/* 未拆解組件
//             {
//                 filterMonsters.map((monter)=>{
//                   return <p key={monter.id}>{monter.name} </p>
//                   }
//                 )
//             }  */}
//             <SearchBox 
//                 className='search-box'
//                 onChangeHandler={onSearchChange} 
//                 placeholder='search monster...'
//             />
//             <CardList monsters={filterMonsters}/>
//             </div>
//         )
//     }
// }



export default App;
