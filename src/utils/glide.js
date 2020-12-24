export function fromArticle(...article){
  return article.map(a => {
    return {
      id: a.id,
      link: `/article/${a.id}`,
      img: a.cover,
      title: a.title
    }
  })
}
