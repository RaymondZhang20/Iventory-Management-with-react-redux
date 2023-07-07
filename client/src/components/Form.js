import './Form.css';
import {clearForm} from "../redux/actions";
import {deleteAll, restoreAll} from "../redux/reducers/InventoryReducer";
import {useDispatch, useSelector} from "react-redux";
import {addItemAsync, deleteItemAsync, getInvAsync, sortInvAsync} from "../redux/thunks";
import DropdownSelect from "react-dropdown-select";
import {useState} from "react";

export default function Form() {
    const form = useSelector(state => state.form).form;
    const inventory = useSelector(state => state.inv).items;
    const dispatch = useDispatch();

    const artistList = [
        {value: "", label: "Unknown"},
        {value: "64a6492a3f5da6cf0e59b9d5", label: "Coldplay"},
        {value: "64a67b8b3f5da6cf0e59b9d6", label: "Harry Styles"}
    ]

    const [selectedArtist, setSelectedArtist] = useState(artistList[0]);
    const handleArtistChange = (selectedItems) => {
        setSelectedArtist(selectedItems[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: "UPDATE_FORM",
            payload: { [name]: value }
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            "itemName": form.itemName,
            "description": form.itemDescription,
            "price": form.itemPrice,
            "imageURL": form.itemImage
        };
        if (selectedArtist.value !== "") {
            newItem["artist"] = selectedArtist.value;
        }
        dispatch(addItemAsync(newItem));
        dispatch(clearForm());
    }

    function confirmDelete() {
        if (inventory !== undefined) {
            inventory.forEach((item) => {
                if (item.deleted === true) {
                    dispatch(deleteItemAsync(item._id));
                }
            });
        }
    }

    return (
        <form id="Form" onSubmit={handleSubmit}>
            <label htmlFor="From-name">Name:</label>
            <input type="text" id="From-name" name="itemName" value={form.itemName} onChange={handleChange} required/>

            <label htmlFor="From-description">Description:</label>
            <textarea id="From-description" name="itemDescription" value={form.itemDescription} onChange={handleChange} required></textarea>

            <label htmlFor="From-price">Price:</label>
            <input type="number" id="From-price" name="itemPrice" value={form.itemPrice} step="0.01" onChange={handleChange} required/>

            <label htmlFor="From-image">Image URL:(empty if no image)</label>
            <input type="url" id="From-image" name="itemImage" value={form.itemImage} onChange={handleChange}/>

            <label>Artist:</label>
            <DropdownSelect options={artistList} id="From-artist" name="itemArtist" onChange={handleArtistChange} values={selectedArtist ? [selectedArtist] : []}/>

            <div className="Form-button">
                <button type="submit">Add Item</button>
                <button type="button" onClick={() => dispatch(clearForm())}>Clear</button>
                <button type="button" onClick={() => dispatch(deleteAll())}>Delete All</button>
                <button type="button" onClick={() => dispatch(restoreAll())}>Restore All</button>
                <button type="button" onClick={() => dispatch(sortInvAsync())}>Sort By Price</button>
                <button type="button" onClick={confirmDelete}>Confirm Deletion</button>
            </div>
        </form>
    );
}