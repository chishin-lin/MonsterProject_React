
import './cardLists.css';
import Card from './Card/Card'

const CardList =({monsters })=>(
        <div className="card-list">
            {
                monsters.map( 
                    monster =>
                    <Card key={monster.id} monster={monster}/>
                )       
            }
        </div>
    )


export default CardList;