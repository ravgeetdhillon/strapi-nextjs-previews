import React from "react";
import styled from "styled-components";
import { useContentManagerEditViewDataManager } from "strapi-helper-plugin";
import EyeIcon from "./view.svg";

const StyledPreviewLink = styled.a`
  display: block;
  color: #333740;
  width: 100%;
  text-decoration: none;
  span,
  i,
  svg {
    color: #333740;
    width: 13px;
    height: 12px;
    margin-right: 10px;
    vertical-align: 0;
  }
  span {
    font-size: 13px;
  }
  i {
    display: inline-block;
    background-image: url(${EyeIcon});
    background-size: contain;
  }
  &:hover {
    text-decoration: none;
    span,
    i,
    svg {
      color: #007eff;
    }
  }
`;

const PreviewLink = () => {
  const { modifiedData } = useContentManagerEditViewDataManager();

  if (!modifiedData.slug) {
    return null;
  }

  if (!CLIENT_FRONTEND_URL || !CLIENT_PREVIEW_SECRET) {
    return null;
  }

  return (
    <li>
      <StyledPreviewLink
        href={`${CLIENT_FRONTEND_URL}/api/preview?secret=${CLIENT_PREVIEW_SECRET}&slug=${modifiedData.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        title="page preview"
      >
        <i />
        Preview
      </StyledPreviewLink>
    </li>
  );
};

export default PreviewLink;
