import GalleryItem from './GalleryItem'

function Gallery(props){

    const display = props.data.map((item, index) => {
        return (
            <GalleryItem item={item} key={index} />
        )
    })

    return (
        <div className='Gallery'>
            {display}
        </div>
    )
}

export default Gallery

