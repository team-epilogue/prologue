import React, { useState } from "react";
import styles from "features/post/PostWrite.module.css";
import Text from "components/Text";
import ButtonStyled from "components/Button";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PostWriteTitle from "../features/post/PostWriteTitle";
import PostWriteContents from "../features/post/PostWriteContents";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import Axios from "api/MultipartAxios";
import api from "api/Api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  resetPostFileList,
  selectPostCategory,
  selectPostContent,
  selectPostDescription,
  selectPostFileList,
  selectPostFiles,
  selectPostTagList,
  selectPostTitle,
} from "slices/postSlice";
import Modal from "components/Modal";
import { useNavigate } from "react-router-dom";

interface writeDetailPostRequestProps {
  accessToken: string;
  githubId: string;
  content: string;
  images: any[];
  blogType: number;
}

const PostWritePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { accessToken, githubId, blogType } = useSelector((state: rootState) => state.auth);

  const [loading, setLoading] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const title = useAppSelector(selectPostTitle);
  const description = useAppSelector(selectPostDescription);
  const category = useAppSelector(selectPostCategory);
  const tagList = useAppSelector(selectPostTagList);
  const content = useAppSelector(selectPostContent);
  const fileList = useAppSelector(selectPostFileList);
  const files = useAppSelector(selectPostFiles);

  const savePost = async () => {
    if (title == "") {
      setSaveModalOpen(false);
      document.getElementById("titleError").style.display = "inline";
      setTimeout(() => {
        document.getElementById("titleError").style.display = "none";
      }, 3500);
    }

    if (description == "") {
      setSaveModalOpen(false);
      document.getElementById("descriptionError").style.display = "inline";
      setTimeout(() => {
        document.getElementById("descriptionError").style.display = "none";
      }, 3500);
    }

    if (title != "" && description != "" && content != "") {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
        const file: File = files[i];
      }

      const frontMatter =
        "---\ntitle: " +
        title +
        "\ndescription: " +
        description +
        "\ncategory: " +
        category +
        "\ntags: [" +
        tagList +
        "]\ndate: " +
        new Date().toISOString() +
        "\n---\n";

      const writeDetailPostRequest: writeDetailPostRequestProps = {
        accessToken: accessToken,
        githubId: githubId,
        content: frontMatter + content,
        images: [],
        blogType: blogType,
      };

      if (fileList.length) {
        for (let i = 0; i < fileList.length; i++) {
          const tmp = {
            url: fileList[i].url,
            name: fileList[i].name,
          };
          writeDetailPostRequest.images.push(tmp);
        }
      }

      formData.append(
        "writeDetailPostRequest",
        new Blob([JSON.stringify(writeDetailPostRequest)], { type: "application/json" }),
      );

      setSaveModalOpen(false);
      setLoading(true);
      await Axios.post(api.posts.writePost(), formData)
        .then((res) => {
          setLoading(false);
          setUploadModalOpen(true);
          navigate("/post");
        })
        .catch((err) => {
          setLoading(false);
        });
      dispatch(resetPostFileList());
    }
  };

  const showCancelModal = () => {
    setCancelModalOpen(true);
  };

  const showSaveModal = () => {
    setSaveModalOpen(true);
  };

  return (
    <div className={styles.postWrite}>
      <div className={styles.textBox}>
        <Text value="????????? ??????" type="groupTitle" bold />
        <br />
        <br />
        <Text value="???????????? ????????? ????????? ???????????? ??????????????????." type="caption" color="dark_gray" />

        <div className={styles.postWriteButtons}>
          <ButtonStyled
            label="????????????"
            color="sky"
            width="10vw"
            icon={<MeetingRoomOutlinedIcon />}
            onClick={showCancelModal}
          />
          &nbsp; &nbsp; &nbsp;
          <ButtonStyled label="????????????" width="10vw" icon={<CheckOutlinedIcon />} onClick={showSaveModal} />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "1%" }}>
        <PostWriteTitle />
        <PostWriteContents />
      </div>

      {loading && <Modal text={`????????? ????????? ?????????????????????????`} loding />}

      {cancelModalOpen && (
        <Modal
          text={`?????? ????????? ???????????? ?????????????????????????\n?????? ?????? ???????????? ???????????????.`}
          twoButtonCancle={() => setCancelModalOpen(false)}
          twoButtonConfirm={() => navigate("/post")}
        />
      )}
      {saveModalOpen && (
        <Modal
          text={`????????? ????????? ?????????????????????????`}
          twoButtonCancle={() => setSaveModalOpen(false)}
          twoButtonConfirm={savePost}
        />
      )}
      {uploadModalOpen && <Modal saveButtonClose={() => setUploadModalOpen(false)} save />}
    </div>
  );
};

export default PostWritePage;
