import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Main() {
    const [customerData, setCustomerData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [category, setCategory] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:9000/admin/customers")
            .then(res => setCustomerData(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.post("http://localhost:9000/admin/products")
            .then(res => setProductData(res.data))
            .catch(err => console.log(err));
    }, []);

    const clickTab = (name) => {
        setCategory(name);
        setIsOpen(!isOpen);
    }

    return (
        <div className='adminMain-container'>
            <ul className='adminMain-menu-list'>
                <li className={category === "customers" ? 'adminMain-menu-select' : 'adminMain-menu'} onClick={() => clickTab("customers")}>
                    고객정보
                </li>
                <li className={category === "products" ? 'adminMain-menu-select' : 'adminMain-menu'} onClick={() => clickTab("products")}>
                    상품리스트
                </li>
            </ul>
            { isOpen &&
                category === "customers" &&
                <table className='adminMain-table'>
                    <tr>
                        <th>회원번호</th>
                        <th>이름</th>
                        <th>아이디(닉네임)</th>
                        <th>이메일</th>
                        <th>전화번호</th>
                        <th>주소</th>
                        <th>생일</th>
                        <th>멤버십 등급</th>
                    </tr>
                    { customerData && customerData.map((list) => 
                        <tr>
                            <td>{list.customer_id}</td>
                            <td>{list.name}</td>
                            <td>{list.username}</td>
                            <td>{list.email}</td>
                            <td>{list.phone}</td>
                            <td>{list.address}</td>
                            <td>{list.birth_date}</td>
                            <td>{list.membership_level}</td>
                        </tr>
                    ) }
                </table>
            }
            { isOpen &&
                category === "products" &&
                <table className='adminMain-table'>
                    <tr>
                        <th>상품번호</th>
                        <th>대분류</th>
                        <th>소분류</th>
                        <th>상품명</th>
                        <th>색상</th>
                        <th>사이즈</th>
                        <th>좋아요 수</th>
                        <th>별점</th>
                        <th>재고</th>
                        <th>원가</th>
                        <th>할인률</th>
                        <th>판매가</th>
                    </tr>
                    { productData && productData.map((list) =>
                        <tr>
                            <td>{list.pid}</td>
                            <td>{list.category}</td>
                            <td>{list.sub_category}</td>
                            <td>{list.name}</td>
                            <td>{list.color.map((color) => <span>{color} </span>)}</td>
                            {/* <td>{list.color.map((list) => list.split(",").map(color => <span>{color}</span>))}</td> */}
                            <td>{list.size.map((option) => <span>{option.name ? option.name : option} </span>)}</td>
                            <td>{list.likes}</td>
                            <td>{list.star}</td>
                            <td>{list.stock}</td>
                            <td>{list.original_price}</td>
                            <td>{list.discount_rate}</td>
                            <td>{list.discounted_price}</td>
                        </tr>
                    ) }
                </table>
            }
        </div>
    );
}