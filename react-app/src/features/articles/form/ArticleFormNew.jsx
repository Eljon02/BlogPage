import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import axios from "axios";
import Sidebar from "../../../app/layout/Sidebar";
import { v4 as uuid } from "uuid";

export default function ArticleFormNew() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const { articleId } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7153/api/Articles/${articleId}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setImageUrl(response.data.image);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (articleId) fetchArticle();
  }, [articleId]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleArticleSave = async () => {
    if (!articleId) {
      try {
        const id = uuid();
        await axios.post("https://localhost:7153/api/articles", {
          articleId: id,
          title,
          content,
        });
        if (image !== undefined) {
          const formData = new FormData();
          formData.append("File", image);
          await axios.post(
            `https://localhost:7153/api/photos/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        navigate("/admin");
      } catch (error) {
        console.error("Error adding article:", error);
      }
    } else {
      try {
        await axios.put(`https://localhost:7153/api/articles/${articleId}`, {
          articleId,
          title,
          content,
        });
        if (imageUrl !== null && image !== undefined) {
          const formData = new FormData();
          formData.append("File", image);
          await axios.delete(`https://localhost:7153/api/photos/${articleId}`);
          await axios.post(
            `https://localhost:7153/api/photos/${articleId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else if (image !== undefined) {
          const formData = new FormData();
          formData.append("File", image);
          await axios.post(
            `https://localhost:7153/api/photos/${articleId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        navigate("/admin");
      } catch (error) {
        console.error("Error updating article:", error);
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 5, margin: "50px" }}>
        <div className="top gap-4 mb-4">
          <h1>Add/Edit</h1>
        </div>
        <div className="bottom">
          <div className="flex flex-wrap gap-4">
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered input-accent w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="text"
                placeholder="Content"
                className="input input-bordered input-accent w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <input
                type="file"
                placeholder="Image"
                className="input input-bordered input-accent w-full"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            as={Link}
            to="/dashboard/users"
            floated="left"
            type="button"
            content="Cancel"
          />
          <Button onClick={handleArticleSave} style={{ marginLeft: "10px" }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
