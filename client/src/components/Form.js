import './Form.css';
import {addItem, clearForm, deleteAllItems, restoreAllItems} from "../actions";
import {useDispatch, useSelector} from "react-redux";

export default function Form() {
    const form = useSelector(state => state.form).form;
    const dispatch = useDispatch();
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
            "imageURL": form.itemImage,
            "deleted": false,
            "detailed": false
        };
        dispatch(addItem(newItem));
        dispatch(clearForm());
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

            <div className="Form-button">
                <button type="submit">Add Item</button>
                <button type="button" onClick={() => dispatch(clearForm())}>Clear</button>
                <button type="button" onClick={() => dispatch(deleteAllItems())}>Delete All</button>
                <button type="button" onClick={() => dispatch(restoreAllItems())}>Restore All</button>
            </div>
        </form>
    );
}