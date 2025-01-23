namespace chatApp.CORE.interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        T GetById(Guid id);
        IEnumerable<T> GetAll();
        void Add(T entity);
        void Update(T entity);
        void Delete(Guid id);

    }
}
