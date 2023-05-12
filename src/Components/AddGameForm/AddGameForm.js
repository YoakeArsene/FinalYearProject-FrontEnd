import React, {useEffect, useState} from 'react';
import styles from './AddGameForm.module.css';
import {motion} from "framer-motion";
import {makeRequest} from "../../axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const AddGameForm = ({setShowAddGameForm}) => {
    const [inputs, setInputs] = useState({
        id: 0,
        name: "",
        surname: "",
        price: "",
        desc: "",
        link: "",
        release: "",
        platforms: "",
        genre: "",
        developers: "",
        publishers: "",
        rating: 0,
    });
    const [cover, setCover] = useState(null);
    const [footage, setFootage] = useState([]);
    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const animations = {
        initial: { opacity: 0, y: -225 },
        animate: { opacity: 1, y: 0, transition: { y: { type: "spring", duration: 1.5, bounce: 0.5 }} },
        exit: { opacity: 0, y: -175, transition: { y: { type: "tween", duration: 0.675, bounce: 0.5 }, opacity: { type: "tween", duration: 0.675 }} },
    }

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newGame) => {
            return makeRequest.post("game/add", newGame);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["games"]);
                navigate("/store/manage");
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrls = [];
        let coverUpload;
        let coverUrl;
        let idNumber;
        let ratingNumber;
        idNumber = parseInt(inputs.id, 10);
        ratingNumber = parseInt(inputs.rating, 10);
        coverUpload = await upload(cover);
        coverUrl = coverUpload?.data;

        if (footage.length > 0) {
            for (const file of footage) {
                const uploadData = await upload(file);
                const imgUrl = uploadData?.data;
                imgUrls.push(imgUrl);
            }
        }
        try {
            mutation.mutate({
                id: idNumber,
                name: inputs.name,
                surname: inputs.surname,
                price: inputs.price,
                desc: inputs.desc,
                link: inputs.link,
                release: inputs.release,
                platforms: inputs.platforms,
                genre: inputs.genre,
                developers: inputs.developers,
                publishers: inputs.publishers,
                rating: ratingNumber,
                cover: coverUrl,
                footage: imgUrls,
            });
        } catch (error) {
            console.log(error);
        }
        setShowAddGameForm(false);
        setCover(null);
        setFootage([]);
    };

    useEffect(() => {
        console.log(cover);
    }, [cover]);

    useEffect(() => {
        console.log(footage);
    }, [footage]);


    return (
        <motion.div className={styles.formContainer} variants={animations} initial="initial" animate="animate" exit="exit">
            <div className={styles.formContent}>
                <div className={styles.formText}>
                    <h1>Add Game</h1>
                </div>
            </div>
            <motion.div
                animate="visible"
                transition={{ opacity: { type: "spring" }, duration: 0.01, delay: 0.25 }}
                className={styles.formForm}
            >
                <form>
                    <div>
                        <input
                            type="number"
                            placeholder="ID"
                            name="id"
                            onChange={handleChange}
                        >
                        </input>
                        <input
                            type="number"
                            placeholder="Rating"
                            name="rating"
                            onChange={handleChange}
                        >
                        </input>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                        >
                        </input>
                        <input
                            type="text"
                            placeholder="Surname"
                            name="surname"
                            onChange={handleChange}
                        >
                        </input>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Price"
                            name="price"
                            onChange={handleChange}
                        >
                        </input>
                        <input
                            type="text"
                            placeholder="Desc"
                            name="desc"
                            onChange={handleChange}
                        >
                        </input>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Link"
                            name="link"
                            onChange={handleChange}
                        >
                        </input>
                        <input
                            type="text"
                            placeholder="Release"
                            name="release"
                            onChange={handleChange}
                        >
                        </input>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Platforms"
                            name="platforms"
                            onChange={handleChange}
                        >
                        </input>
                        <input
                            type="text"
                            placeholder="Genre"
                            name="genre"
                            onChange={handleChange}
                        >
                        </input>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Developers"
                            name="developers"
                            onChange={handleChange}
                        >
                        </input>
                        <input
                            type="text"
                            placeholder="Publishers"
                            name="publishers"
                            onChange={handleChange}
                        >
                        </input>
                    </div>

                    <div>
                        <label>Cover</label>
                        <label>Footage</label>
                    </div>

                    <div>
                        <input
                            type="file"
                            id="cover"
                            onChange={(e) => {
                                setCover(e.target.files[0]);
                            }}
                        >
                        </input>
                        <input
                            type="file"
                            id="footage"
                            onChange={(e) => {
                                const selectedFiles = Array.from(e.target.files);
                                setFootage([...footage, ...selectedFiles]);
                            }}
                            multiple
                        >
                        </input>
                    </div>
                    <div>
                        <button onClick={handleClick} className={`${styles.cta}`}>
                            Add
                        </button>
                        <button onClick={() => setShowAddGameForm(false)} className={`${styles.cta}`}>
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddGameForm;
