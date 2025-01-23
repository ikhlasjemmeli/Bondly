using chatApp.CORE.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace chatApp.EF.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T :class
    {
        public readonly ApplicationContext _context;
        public BaseRepository(ApplicationContext context)
        {
            _context = context;
            
        }
        public void Add(T entity)
        {
           _context.Set<T>().Add(entity);
        }

        public void Delete(Guid id)
        {
            T itemToDelete = _context.Set<T>().Find(id);
            _context.Set<T>().Remove(itemToDelete);
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToArray();
        }

        public T GetById(Guid id)
        {
            return _context.Set<T>().Find(id);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }
    }
}
