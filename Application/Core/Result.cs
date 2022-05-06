namespace Application.Core
{
    public class Result<T>
    {
        public bool isSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }

        //if != null return activity
        //if null return NotFound
        public static Result<T> Success(T value) => new Result<T> {isSuccess = true, Value = value};

        //Logic based on if something is wrong inside the handler
        public static Result<T> Failure(string error) => new Result<T> {isSuccess = false, Error = error};
    }
}