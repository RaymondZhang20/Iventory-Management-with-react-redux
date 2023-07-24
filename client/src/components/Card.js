import './Card.css';
import React, {useState} from "react";
import default_img from "../default.png";
import {expandItem, compressItem, deleteItem} from "../redux/reducers/InventoryReducer";
import {useDispatch, useSelector} from "react-redux";
import Popup from "reactjs-popup";
import {getInvAsync, updateItemAsync} from "../redux/thunks";

export default function Card(props) {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.inv).artists;
    let artist = {};
    if (props.artist) {
        artist = artists.find(a => a.artistName === props.artist.artistName);
    }
    const cardClassName = `card ${props.deleted ? "Card card-delete" : "Card"}`;
    const cardDesClassName = `card ${props.detailed ? "Card-description" : "Card-description Card-hidden"}`;
    const cardPriClassName = `card ${props.detailed ? "Card-price" : "Card-price Card-hidden"}`;
    const [popupForm, setPopupForm] = useState({
        itemName: props.name,
        description: props.description,
        price: props.price,
        imageURL: props.img
    });
    const handleSave = () => {
        const updatedItem = { _id: props._id, ...popupForm};
        dispatch(updateItemAsync(updatedItem));
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPopupForm((form) => ({
            ...form,
            [name]: value
        }));
    };
    const isDefaultImg = (props.img==="none" || props.img==="");
    let defaultImgURL = 'http://localhost:4000/defaultImg';

    return (
            <div className={cardClassName} data-testid="Card">
                {isDefaultImg?
                    // <img src={default_img} alt="default image" className="Card-image"/> :
                    <img src={defaultImgURL} alt="default image" className="Card-image"/> :
                    <img src={props.img} alt={props.name} className="Card-image"/>}
                <div className="Card-content">
                    {isDefaultImg?
                        <h2 className="Card-name">{props.name + "(Default Image)"}</h2> :
                        <h2 className="Card-name">{props.name}</h2>}
                    {props.artist?
                        <Popup
                            trigger={
                                <a className="Card-artist">By: {props.artist? props.artist.artistName: 'Unknown'}</a>}
                            modal
                            closeOnDocumentClick
                            contentStyle={{ width: "400px", padding: "20px" }}
                        >
                            {(close) => (
                                <div className="popup">
                                    <img src={artist.imageURL} alt={artist.artistName} className="Card-image"/>
                                    <h2>{artist.artistName}</h2>
                                    <p>{artist.description}</p>
                                    <button type="button" onClick={close}>
                                        Close
                                    </button>
                                </div>
                            )}
                        </Popup>:
                        <a className="Card-artist">By: Unknown</a>
                    }
                    <p className={cardDesClassName}>{props.description}</p>
                    <p className={cardPriClassName}>${props.price}</p>
                </div>
                <div className="Card-button">
                    <button type="button" onClick={() => dispatch(deleteItem(props._id))}>Delete</button>
                    <button type="button" onClick={() => dispatch(expandItem(props._id))}>Expand</button>
                    <button type="button" onClick={() => dispatch(compressItem(props._id))}>Compress</button>
                    <Popup
                        trigger={<button>Edit</button>}
                        modal
                        closeOnDocumentClick
                        contentStyle={{ width: "400px", padding: "20px" }}
                    >
                        {(close) => (
                            <div className="popup">
                                <img src={props.img} alt={props.name} className="Card-image"/>
                                <form>
                                    <input
                                        type="text"
                                        name="itemName"
                                        placeholder="Item Name"
                                        value={popupForm.itemName}
                                        onChange={handleInputChange}
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        value={popupForm.description}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        value={popupForm.price}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="url"
                                        name="imageURL"
                                        placeholder="Image URL"
                                        value={popupForm.imageURL}
                                        onChange={handleInputChange}
                                    />
                                    <div className="popup-buttons">
                                        <button type="button" onClick={() => { handleSave(); close(); }}>
                                            Save
                                        </button>
                                        <button type="button" onClick={close}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        );
}