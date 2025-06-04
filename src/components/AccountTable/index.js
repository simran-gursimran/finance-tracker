import React, { useState } from "react";
import "./styles.css";
import { Button, Radio, Select, Table } from "antd";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import Modal from "antd/es/modal/Modal";
import EditEditDeleteModal from "../EditDelete";
import { updateAccountOnFirebase } from "../../hooks/updateAccount";
import { deleteAccountOnFirebase } from "../../hooks/deleteAccountOnFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { AiOutlineSearch } from "react-icons/ai";
import AddAccount from "../Modals/addAcccount";

const AccountTable = ({
    accounts,
    addAccount,
    fetchAccounts,
}) => {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [user] = useAuthState(auth);
    const [isAcocuntModalVisible, setIsAccountModalVisible] = useState(false);

    const showAccountModal = () => {
        setIsAccountModalVisible(true);
    };

    const handleAccountCancel = () => {
        setIsAccountModalVisible(false);
    };

    const onFinish = (values) => {
        const newAccount = {
            type: values.type,
            date: values.date.format("DD-MM-YYYY"),
            amount: parseFloat(values.amount),
            name: values.name,
        };

        setIsAccountModalVisible(false);
        addAccount(newAccount);
        fetchAccounts();
    };

    //   define a columns for our table
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
    ];

    let filterAccountArray = accounts.filter(
        (item) =>
            item.name.toLowerCase().includes(search.toLocaleLowerCase()) &&
            item.type.includes(typeFilter)
    );

    let sortedAccounts = filterAccountArray.sort((a, b) => {
        if (sortKey === "date") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortKey === "amount") {
            return a.amount - b.amount;
        } else {
            return 0;
        }
    });

    const handleEdit = (account) => {
        setSelectedAccount(account);
        setShowEditModal(true);
    };

    const handleEditSave = async (editedAccount) => {
        // Call the function to update the transaction in Firebase
        await updateAccountOnFirebase(user.uid, editedAccount);
        setShowEditModal(false);
        fetchAccounts(); // Fetch the updated data from Firebase
    };

    const handleDeleteSave = async (editedAccount) => {
        // Call the function to update the transaction in Firebase
        await deleteAccountOnFirebase(user.uid, editedAccount);
        setShowEditModal(false);
        fetchAccounts(); // Fetch the updated data from Firebase
    };

    const handleEditCancel = () => {
        setShowEditModal(false);
    };


    return (
        <div className="table-box container">
            <Modal open={isAcocuntModalVisible} onCancel={handleAccountCancel}>
                Acocunt
            </Modal>
            <AddAccount
                isAccountModalVisible={isAcocuntModalVisible}
                handleAccountCancel={handleAccountCancel}
                onFinish={onFinish}
            />
            <h2>My Accounts</h2>
            <div className="search-and-filter container">
                <AiOutlineSearch className="search-icon" />
                <input
                    className="search-bar"
                    type="search"
                    value={search}
                    onChangeCapture={(e) => setSearch(e.target.value)}
                    placeholder="Search by name"
                // className="custome-input search-bar"
                />
                <Select
                    className="search-bar select-filter"
                    onChange={(value) => setTypeFilter(value)}
                    value={typeFilter}
                    placeholder="Filter"
                    allowClear
                >
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="bank">Bank</Select.Option>
                    <Select.Option value="mutuaalfund">Mutual Fund</Select.Option>
                    <Select.Option value="mutuaalfund">Stock</Select.Option>
                </Select>
            </div>
            <div className="import-export-sort container">
                <Radio.Group
                    className="input-radio"
                    onChange={(e) => setSortKey(e.target.value)}
                    value={sortKey}
                >
                    <Radio.Button value="">No Sort</Radio.Button>
                    <Radio.Button value="date">Sort by Date</Radio.Button>
                    <Radio.Button value="amount">Sort by Amount</Radio.Button>
                </Radio.Group>
                <div className="ix-button">
                    <Button className="btn reset-balance-btn" onClick={showAccountModal}>
                        Add Account
                    </Button>
                </div>
            </div>
            <div className="table-container">
                <Table
                    dataSource={sortedAccounts}
                    columns={columns}
                    className="table"
                    onRow={(record) => ({
                        onClick: () => handleEdit(record), // Handle row click event
                    })}
                />
                {showEditModal && selectedAccount && (
                    <EditEditDeleteModal
                        transaction={selectedAccount}
                        onSave={handleEditSave}
                        onDelete={handleDeleteSave}
                        onCancel={handleEditCancel}
                    />
                )}
            </div>
        </div>
    );
};

export default AccountTable;
