void rectangle_case();
void trangle_case();
void print_traingle(int height, int width);
#include<iostream>
using namespace std;
/*
int main()
{

    int choice = 0;
    while (choice != 3) {
        cout << "Please Enter your choice:\n 1-rectangle \n 2-traingle \n 3-exit" << endl;
        cin >> choice;
        switch (choice)
        {
        case 1:
            rectangle_case();
            break;
        case 2:
            trangle_case();
            break;
        case 3:
            break;
        default:
            cout << "Invalid input, try again" << endl;
            break;
        }
    }
    return 0;
}
*/
void rectangle_case() {
    cout << "Enter height and width" << endl;
    int height, width;
    cin >> height; //Valid input is guaranteed
    cout << "Enter width" << endl;
    cin >> width; //Valid input is guaranteed
    if (abs(height - width) > 5)
        cout << "area: " << height * width << endl; //rectangle area
    else
        cout << "circumference: " << height * 2 + width * 2 << endl; //rectangle circumference
}


void trangle_case() {
    cout << "Enter height and width" << endl;
    int height, width;
    cin >> height; //Valid input is guaranteed
    cout << "Enter width" << endl;
    cin >> width; //Valid input is guaranteed
    cout << "Please enter your choice: \n 1 - calculate the circumference \n 2 - print" << endl;
    int choice;
    cin >> choice;
    double hypotenuse = sqrt(pow(height, 2) + pow(width, 2)); //Pythagorean Theorem

    switch (choice)
    {
    case 1:
        cout << "circumference: " << hypotenuse * 2 + width << endl; //trangle circumference
        break;
    case 2:
        print_traingle(height, width);
        break;
    default:
        break;
    }
}


void print_traingle(int height, int width) {
    if (width % 2 == 0 || height * 2 < width) {
        cout << "Sorry printing is impossible" << endl;
    }
    else
    {
        int space = width / 2;
        //printing the first line
        for (int i = 0; i < space; i++)
            cout << " ";
        cout << "*" << endl;
        space--;
        int even_num = (width - (width % 2 == 0 ? 1 : 2)) / 2; //nubmer of even numbers between 1 to height
        int line_repeat = (height - 2) / even_num;
        int find_name = (height - 2) % even_num;
        int num_of_cochavit = 3;
        //print the שארית in the first group
        for (int i = 0; i < find_name; i++) {
            for (int j = 0; j < space; j++)
                cout << " ";
            for (int j = 0; j < num_of_cochavit; j++)
                cout << "*";
            cout << endl;
        }
        //print all the groups
        for (int i = 0; i < even_num; i++, space--, num_of_cochavit += 2) {
            for (int j = 0; j < line_repeat; j++)
            {
                for (int t = 0; t < space; t++)
                    cout << " ";
                for (int t = 0; t < num_of_cochavit; t++)
                    cout << "*";
                cout << endl;
            }
        }
        //printing the last line
        for (int i = 0; i < width; i++)
            cout << "*";
        cout << endl;
    }
}