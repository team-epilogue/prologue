import Text from "components/Text";
import React, { useEffect, useState } from "react";
import DetailSelector from "./DetailSelector";
import styles from "../Setting.module.css";
import SettingLayout from "./SettingLayout";
import { useAppSelector } from "app/hooks";
import { colorsConfig, initialState, selectColors, setClickedComp, setColors } from "slices/settingSlice";
import ButtonStyled from "components/Button";
import { useDispatch, useSelector } from "react-redux";
import { DetailSettingStyles } from "./DetailSettingStyles";
import Axios from "api/MultipartAxios";
import { rootState } from "app/store";
import api from "api/Api";
import { toJSON } from "cssjson";

const DetailSetting = () => {
  const [titleImg, setTitleImg] = useState(null);
  const [logoImg, setLogoImg] = useState(null);
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const colors: colorsConfig = useAppSelector(selectColors);
  const formData = new FormData();
  const dispatch = useDispatch();

  const getDetailSetting = async () => {
    await Axios.get(api.setting.getDetail(accessToken, githubId))
      .then((res) => {
        console.log(res);
        const removedResult = res.data.css.replaceAll(".", "");
        const result = toJSON(removedResult);
        console.log("카테고리 변환 결과: ", result.children.category.attributes);
        console.log("프로필 반환 결과: ", result.children.profile.attributes);
        const categoryAtt = result.children.category.attributes;
        console.log("배경 색: ", categoryAtt["background-color"]);
        const categoryBack = categoryAtt["background-color"];
        dispatch(setColors({ ...colors, category: { ...colors.category, background: categoryBack } }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOnSave = async () => {
    const modified = DetailSettingStyles(colors);
    const result = {
      accessToken: accessToken,
      githubId: githubId,
      css: modified,
      logoText: colors.logo.inputText,
    };
    console.log(JSON.stringify(result));
    formData.append("logoImage", logoImg);
    formData.append("titleImage", titleImg);
    formData.append("modifyBlogLayoutCssRequest", new Blob([JSON.stringify(result)], { type: "application/json" }));

    await Axios.put(api.setting.modifyDetail(), formData)
      .then((res: any) => {
        console.log("됨? ", res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailSetting();
  }, []);

  // 언마운트 시 초기화 실행
  useEffect(() => {
    return () => {
      dispatch(setClickedComp(initialState.clickedComp));
      dispatch(setColors(initialState.colorList));
    };
  }, []);

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="세부 레이아웃 설정" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="레이아웃에 원하는 디자인을 선택하여 적용하세요." type="caption" />
      </div>
      <div className={styles.layoutSelectContainer}>
        <DetailSelector titleImg={titleImg} setTitleImg={setTitleImg} logoImg={logoImg} setLogoImg={setLogoImg} />
        <SettingLayout />
      </div>
      <div className={styles.confirmButton}>
        <div style={{ margin: "10px" }}>
          <ButtonStyled color="sky" label="취소" />
        </div>
        <div style={{ margin: "10px" }}>
          <ButtonStyled label="저장" onClick={handleOnSave} />
        </div>
      </div>
    </div>
  );
};

export default DetailSetting;
