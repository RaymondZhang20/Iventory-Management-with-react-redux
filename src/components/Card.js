import './Card.css';
import React from "react";
import default_img from "../default.png";
import {deleteItem, expandItem, compressItem} from "../actions";
import {useDispatch, useSelector} from "react-redux";

export default function Card(props) {
    const isDeleting = useSelector(state => state.card).isDeleting;
    const dispatch = useDispatch();
    const cardClassName = `card ${props.deleted ? "Card card-delete" : "Card"}`;
    const cardDesClassName = `card ${props.detailed ? "Card-description" : "Card-description Card-hidden"}`;
    const cardPriClassName = `card ${props.detailed ? "Card-price" : "Card-price Card-hidden"}`;
    if (props.img==="none" || props.img==="") {
        return (
            <div className={cardClassName}>
                <img src={default_img} alt="default image" className="Card-image"/>
                <div className="Card-content">
                    <h2 className="Card-name">{props.name + "(Default Image)"}</h2>
                    <p className={cardDesClassName}>{props.description}</p>
                    <p className={cardPriClassName}>${props.price}</p>
                </div>
                <div className="Card-button">
                    <button type="button" onClick={() => dispatch(deleteItem(props.name))}>Delete Item</button>
                    <button type="button" onClick={() => dispatch(expandItem(props.name))}>Expand Item</button>
                    <button type="button" onClick={() => dispatch(compressItem(props.name))}>Compress Item</button>
                </div>
            </div>
        );
    } else {
        return (
            <div className={cardClassName}>
                <img src={props.img} alt={props.name} className="Card-image"/>
                <div className="Card-content">
                    <h2 className="Card-name">{props.name}</h2>
                    <p className={cardDesClassName}>{props.description}</p>
                    <p className={cardPriClassName}>${props.price}</p>
                </div>
                <div className="Card-button">
                    <button type="button" onClick={() => dispatch(deleteItem(props.name))}>Delete Item</button>
                    <button type="button" onClick={() => dispatch(expandItem(props.name))}>Expand Item</button>
                    <button type="button" onClick={() => dispatch(compressItem(props.name))}>Compress Item</button>
                </div>
            </div>
        );
    }
}