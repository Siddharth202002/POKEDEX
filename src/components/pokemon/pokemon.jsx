function Pokemon({name,image}){
    return (
        <div>
            <div>{name}</div>
            <div><img src={image} height="200px" width="200px" alt="" /></div>
        </div>
    )


}
export default Pokemon