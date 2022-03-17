import React, { useState, useRef } from "react";
import { Table, Button, Modal } from "antd";
import { useLiveQuery } from "dexie-react-hooks";
import rrwebPlayer from "rrweb-player";
import { unpack, getReplayConsolePlugin } from "rrweb";
import ReactJson from "react-json-view";
import { db } from "../../models/db";
import { transformList } from "../../utils";
import "rrweb-player/dist/style.css";
import { LOGKEY } from "../../constants";
import "./index.css";

export default () => {
    const videoRef = useRef(null);
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Application",
            dataIndex: "project",
            key: "project",
        },
        {
            title: "Log Time",
            dataIndex: "time",
            key: "time",
        },
        {

            title: "The number of incident",
            dataIndex: "events",
            key: "eventsLen",
            render: (row) => row.length,
        },
        {
            title: "Character length",
            dataIndex: "events",
            key: "eventsStrLen",
            render: (row) => JSON.stringify(row).length,
        },
        {
            title: "Operation",
            // dataIndex: "events",
            // key: "events",
            render: (row) => (
                <div>
                    {row.isPack ? (
                        <Button type="text"> 已压缩 </Button>
                    ) : (
                        <Button type="link" onClick={() => handleShowEvents(row.events)}>
                            View data
                        </Button>
                    )}
                    <Button type="link" onClick={() => handlePlay(row.events)}>
                        Playback
                    </Button>
                </div>
            ),
        },
    ];

    const [currentData, setCurrentData] = useState({});
    const [visible, setVisible] = useState(false);
    const [jsonVisible, setJsonVisible] = useState(false);
    const [jsonData, setJsonData] = useState(null);
    let timer = null;

    const list = useLiveQuery(() => db.rrwebLists.toArray());

    transformList(list);

    const handleShowEvents = (row) => {
        setJsonVisible(true);
        setJsonData(row.events);
    };

    const handlePlay = (row) => {
        setVisible(true);
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            const replayer = new rrwebPlayer({
                target: videoRef.current, // 自定义 DOM 元素
                // 配置项
                props: {
                    events: row,
                    width: 900,
                    height: 400,
                    unpackFn: unpack,
                    plugins: [
                        getReplayConsolePlugin({
                            level: ["info", "log", "warn", "error"],
                        }),
                    ],
                },
            });
            // 允许用户在回放的 UI 中进行交互
            // ?? replayer.enableInteract is not a function
            // replayer.enableInteract();
        }, 1000);
    };

    return (
        <div className="table-container">
            <Table
                bordered
                columns={columns}
                dataSource={list}
                rowKey={(record) => record.id}
            />
            <Modal
                title="Log Play"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width={1000}
                destroyOnClose
            >
                <div ref={videoRef} className="video-container" />
            </Modal>
            <Modal
                title="events list"
                visible={jsonVisible}
                onCancel={() => setJsonVisible(false)}
                footer={null}
                width={1000}
                height={700}
            >
                <ReactJson src={jsonData} />
            </Modal>
        </div>
    );
};
