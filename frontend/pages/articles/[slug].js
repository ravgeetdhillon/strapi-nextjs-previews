import Router from 'next/router';
import MarkdownView from 'react-showdown';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchArticlesApi, fetchArticleApi, fetchArticlePreviewApi } from '/lib/articles';

const ArticleView = (props) => {
  const { article, previewMode } = props;

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg="7" className="mx-lg-auto">
            {previewMode ? (
              <div className="small text-muted border-bottom mb-3">
                <span>You are currently viewing in Preview Mode. </span>
                <a role="button" className="text-primary" onClick={() => exitPreviewMode()}>
                  Turn Off Preview Mode
                </a>
              </div>
            ) : (
              ''
            )}
            <h1>{article.title}</h1>
            <MarkdownView markdown={article.content} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

async function exitPreviewMode() {
  const response = await fetch('/api/exit-preview');

  if (response) {
    Router.reload(window.location.pathname);
  }
}

export async function getStaticPaths() {
  const articles = await fetchArticlesApi();

  const paths = articles.map((article) => ({ params: { slug: article.slug } }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  if (!slug) {
    throw new Error('Slug not valid');
  }

  const previewMode = context.preview ? true : null;

  let article;
  if (previewMode) {
    article = await fetchArticlePreviewApi(slug);
  } else {
    article = await fetchArticleApi(slug);
  }

  if (!article) {
    return { notFound: true };
  }

  return { props: { article, previewMode } };
}

export default ArticleView;
