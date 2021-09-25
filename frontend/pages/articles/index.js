import { Container, Row, Col } from 'react-bootstrap';
import { fetchArticlesApi } from '/lib/articles';
import Link from 'next/link';

const ArticlesView = (props) => {
  const { articles } = props;

  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg="7" className="mx-lg-auto">
            <h1 className="mb-5 border-bottom">Articles</h1>
            {articles.map((article) => {
              return (
                <div key={article.id} className="mb-4">
                  <h2 className="h5">{article.title}</h2>
                  <p className="mb-2">{article.description}</p>
                  <Link href={'/articles/' + article.slug}>
                    <a className="">Read More</a>
                  </Link>
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export async function getStaticProps() {
  const articles = await fetchArticlesApi();
  return {
    props: { articles },
  };
}

export default ArticlesView;
