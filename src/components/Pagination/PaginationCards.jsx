import Pagination from 'react-bootstrap/Pagination';
import style from './PaginationCards.module.css'

function PaginationCards({ cardsPerPagin, currentPage, totalProducts, setCurrentPage }) {
  //logica para paginado
  const noPag = [];//para guardar el n° de pag. totales
  for (let i = 1; i <= Math.ceil(totalProducts / cardsPerPagin); i++) {
    noPag.push(i)
  }
  
  //handlers
  const handlerChangePag = (e, config) => {
    if (config === 'next' && currentPage < noPag.length) setCurrentPage(currentPage + 1);
    if (config === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
    if (config === 'pag') setCurrentPage(Number(e.target.innerText));
    if (config === 'first') setCurrentPage(1);
    if (config === 'last') setCurrentPage(noPag.length);
  }

  return (
    <Pagination className={style.pagItem} >
      <Pagination.First disabled={currentPage === 1} onClick={(e) => handlerChangePag(e, 'first')} />
      <Pagination.Prev disabled={currentPage === 1} onClick={(e) => handlerChangePag(e, 'prev')} />
      {
        noPag.length < 5 ? ( // si hay menos q 5 paginas no mostramos ellipsis
          <>
            {
              noPag.map((elem) => (
                <Pagination.Item active={currentPage === elem} onClick={(e) => handlerChangePag(e, 'pag')} key={elem}>{elem}</Pagination.Item>
              ))
            }
          </>
        ) : (
          <>
            {
              currentPage < 3 && //si el numero de la pagina es menor q 3, mostramos de la siguiente forma
              <>
                {
                  noPag.slice(0, 3).map((pag) => (
                    <Pagination.Item active={currentPage === pag} onClick={(e) => handlerChangePag(e, 'pag')} key={pag}>{pag}</Pagination.Item>
                  ))
                }
                <Pagination.Ellipsis disabled />
                <Pagination.Item active={currentPage === noPag.length} onClick={(e) => handlerChangePag(e, 'pag')}>{noPag.length}</Pagination.Item>
              </>
            }
            {
              currentPage > 2 && currentPage < noPag.length - 2 && ( // si estamos en la pag >3 y menor q el antepenultimo se debe mostrar esta estructura
                <>
                  <Pagination.Item active={currentPage === 1} onClick={(e) => handlerChangePag(e, 'pag')}>{1}</Pagination.Item>
                  <Pagination.Ellipsis disabled />
                  <Pagination.Item active={currentPage === currentPage - 1} onClick={(e) => handlerChangePag(e, 'pag')}>{currentPage - 1}</Pagination.Item>
                  <Pagination.Item active={currentPage === currentPage} onClick={(e) => handlerChangePag(e, 'pag')}>{currentPage}</Pagination.Item>
                  <Pagination.Item active={currentPage === currentPage + 1} onClick={(e) => handlerChangePag(e, 'pag')}>{currentPage + 1}</Pagination.Item>
                  <Pagination.Ellipsis disabled />
                  <Pagination.Item active={currentPage === noPag.length} onClick={(e) => handlerChangePag(e, 'pag')}>{noPag.length}</Pagination.Item>
                </>
              )
            }
            {
              currentPage > noPag.length - 3 && // si el numero de la pagina es mayor que el antepenultimo, mostramos de la siguiente forma
              <>
                <Pagination.Item active={currentPage === 1} onClick={(e) => handlerChangePag(e, 'pag')}>{1}</Pagination.Item>
                <Pagination.Ellipsis disabled />
                {
                  noPag.slice(noPag.length - 3, noPag.length).map((pag) => (
                    <Pagination.Item active={currentPage === pag} onClick={(e) => handlerChangePag(e, 'pag')} key={pag}>{pag}</Pagination.Item>
                  ))
                }
              </>
            }
          </>
        )
      }
      <Pagination.Next disabled={currentPage === noPag.length} onClick={(e) => handlerChangePag(e, 'next')} />
      <Pagination.Last disabled={currentPage === noPag.length} onClick={(e) => handlerChangePag(e, 'last')} />
    </Pagination>
  );
}

export default PaginationCards;
