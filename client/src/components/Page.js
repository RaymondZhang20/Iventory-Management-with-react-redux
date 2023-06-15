import './Page.css';
import Form from "./Form";
import Card from "./Card";
import {useSelector} from "react-redux";

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
    const data = useSelector(state => state.form).items;
    return (
        <div id="HomePage-inv">
            <h1>Inventory</h1>
            <div id="HomePage-list">
                {data.map((data, index) => (
                        <Card key={index} name={data.itemName} description={data.description}
                              price={data.price} img={data.imageURL} deleted={data.deleted}  detailed={data.detailed}/>
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