import React from 'react'
const CardProduct = ({name,description,id}) => {
    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='card-title'>{name}</h4>
                <p className='card-text'>{description}</p>
                <p className='card-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic placeat quis sunt blanditiis aliquam quos delectus, architecto iste maiores eum magnam ullam. Voluptas officiis animi, tenetur dolore facere dicta eveniet.</p>
            </div>
        </div>
    );
}
 
export default CardProduct;