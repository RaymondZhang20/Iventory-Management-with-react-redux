import './Page.css';
import Form from "./Form";
import Card from "./Card";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {filterInvAsync, getArtistsAsync, getInvAsync} from "../redux/thunks";
import DropdownSelect from "react-dropdown-select";
import {clearForm} from "../redux/actions";

export function HomePage() {
    const res = useSelector(state => state.navbar);
    return (
        <div id="HomePage" className={page_class("home", res)}>
            <div id="HomePage-whole">
                <div id="HomePage-form">
                    <Form />
                </div>
                <InvList />
            </div>
        </div>
    );
}

function InvList() {
    const data = useSelector(state => state.inv).items;
    const dispatch = useDispatch();
    const artistList = [
        {value: "", label: "Unknown"},
        {value: "64a6492a3f5da6cf0e59b9d5", label: "Coldplay"},
        {value: "64a67b8b3f5da6cf0e59b9d6", label: "Harry Styles"}
    ]

    const [selectedArtist, setSelectedArtist] = useState(null);
    const handleArtistChange = (selectedItems) => {
        setSelectedArtist(selectedItems);
    };
    useEffect(() => {
        dispatch(getArtistsAsync());
        dispatch(getInvAsync());
    }, [dispatch]);

    function SubmitFilter() {
        const Values = selectedArtist.map((a) => a.value);
        const queryString = new URLSearchParams({ artists: Values }).toString();
        dispatch(filterInvAsync(queryString));
    }

    return (
        <div id="HomePage-inv">
            <label>Filter By Artist:</label>
            <DropdownSelect multi options={artistList} id="From-artist" name="itemArtist" onChange={handleArtistChange} values={selectedArtist ? [selectedArtist] : []}/>
            <button type="button" onClick={SubmitFilter}>Apply</button>
            <h1>Inventory</h1>
            <div id="HomePage-list">
                {data.map((data, index) => (
                        <Card key={index} name={data.itemName} description={data.description} _id={data._id}
                              price={data.price} img={data.imageURL} deleted={data.deleted}  detailed={data.detailed} artist={data.artist}/>
                    ))}
            </div>
        </div>
    );
}

export function AboutPage() {
    const res = useSelector(state => state.navbar);
    return (
        <div id="AboutPage" className={page_class("about", res)}>
            <h2>About me</h2>
            <p>I am currently a third-year student in UBC majoring in CS and minoring in DS.</p>
            <p>Besides, this term is also my second coop term.</p>
            <p>Hoping to learn a lot in this course.</p>
        </div>
    );
}

const page_class = (re, ele) => {
    if (re === ele.currentPage) {
        return "Page";
    } else {
        return "Page Page-hidden";
    }
}