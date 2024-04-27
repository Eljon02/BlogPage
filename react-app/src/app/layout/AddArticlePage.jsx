import React from "react";
import Navbar from "./Navbar";
import ArticleFormNew from "../../features/articles/form/ArticleFormNew";

export default function AddArticlePage() {
  return (
    <div className="h-screen">
      <Navbar />
      <ArticleFormNew cancelLinkTo='/articles' />
    </div>
  );
}
