// See https://aka.ms/new-console-template for more information

class Student
{
    public string Name { set; get; }
    public Dictionary<string, int> Score { set; get; } = new Dictionary<string, int>();
    public double AVG { set; get; }

    public Student(string name, Dictionary<string, int> score)
    {
        Name = name;
        Score = score;
        CalculateAverage();

    }

    private void CalculateAverage()
    {
        var total = 0;
        foreach (var item in Score.Values)
        {
            total += item;
        }

        AVG = (double)total / Score.Count();
    }
}

class Program
{
    static void Main()
    {
        // Tạo mới list thông tin học sinh bất kỳ 
        List<Student> students = new List<Student>()
        {
            new Student("A", new Dictionary<string, int> { { "math", 10 }, { "physic", 9 }, { "chemistry", 8 } }),
            new Student("B", new Dictionary<string, int> { { "math", 8 }, { "physic", 8 }, { "chemistry", 8 } }),
            new Student("C", new Dictionary<string, int> { { "math", 7 }, { "physic", 9 }, { "chemistry", 6 } }),
            new Student("D", new Dictionary<string, int> { { "math", 8 }, { "physic", 8 }, { "chemistry", 8 } }),
            new Student("E", new Dictionary<string, int> { { "math", 9 }, { "physic", 9 }, { "chemistry", 7 } })
        };
        Console.WriteLine("================= Điểm của học sinh ========================");
        foreach (var item in students)
        {
            Console.WriteLine("diem cua học sinh " + item.Name + " : " + item.AVG);
        }

        Console.WriteLine("================= Sắp xếp học sinh theo điều kiện ========================");

        /*
            Sắp xếp mảng đó theo thứ tự điểm trung bình các môn giảm dần, với các object có điểm trung bình bằng nhau,
            sắp xếp theo “name” với alphabel tăng dần. (Không sử dụng hàm sort/order hay thư viện ngoài)
        */
        // dùng bubble sort
        SortStudentByCondition(students);

        foreach (var item in students)
        {
            Console.WriteLine("diem cua học sinh " + item.Name + " : " + item.AVG);
        }

        Console.WriteLine("================= Tìm ra nhanh nhất object nào có điểm trung bình bằng 8 ========================");
        /*
            Với mảng đã sắp xếp, hãy tìm ra nhanh nhất có thể object có điểm trung bình bằng 8.
        */
        // dùng binarySearch để có tốc độ tìm nhanh nhatt
        Console.WriteLine($"Học sinh có điểm trung bình bằng 8 là : {BinarySearchByScore(students, 8).Name}");

        #region Các hàm
        static void SortStudentByCondition(List<Student> students)
        {
            for (int i = 0; i < students.Count; i++)
            { 
                for (int j = i + 1; j < students.Count; j++)
                {
                    if (students[i].AVG < students[j].AVG
                        || students[i].AVG == students[j].AVG && string.Compare(students[i].Name, students[j].Name, StringComparison.Ordinal) > 0
                    )
                    {
                        var temp = students[i];
                        students[i] = students[j];
                        students[j] = temp;
                    }
                }
            }
        }

        static Student BinarySearchByScore(List<Student> students, double targetScore)
        {
            int left = 0, right = students.Count - 1;
            while (left <= right)
            {
                int mid = left + (right - left) / 2;
                if (students[mid].AVG == targetScore)
                    return students[mid];
                else if (students[mid].AVG > targetScore)
                    left = mid + 1;
                else
                    right = mid - 1;
            }
            return null;
        }

        #endregion


    }
}
