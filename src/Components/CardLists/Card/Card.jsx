import './card.css'

const Card=({monster:{name,email,id } })=>{
        return(
            <div className="card-container">
                <img src={`https://robohash.org/${id}?set=set2`}
                    alt="monsterImage" />
                 <h2>{name}</h2>
                 <p>{email}</p>
            </div>
        )
}

export default Card;