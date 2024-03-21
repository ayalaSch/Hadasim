#include<iostream>
#include<math.h>
using namespace std;

const int DIFFER_OF_RECTANGLE = 4;

void rectangleTower();
void triangleTower();
void printTriangle(int, int);

int main()
{
	int choice;
	cout << "Welcome to Twitter Towers" << endl;
	cout << "1- Rectangle \n2- Triangle \n3- Exit \n";
	cin >> choice;
	while (choice != 3)
	{
		switch (choice)
		{
		case 1:
			rectangleTower();
			break;
		case 2:
			triangleTower();
			break;
		default:
			cout << "invalid input" << endl;
			break;
		}
		cout << "1- Rectangle \n2- Triangle \n3- Exit \n";
		cin >> choice;
	}
	return 0;
}

void rectangleTower()
{
	int height, width;
	cout << "Enter height and width of tower" << endl;
	// Correct input is guaranteed
	cin >> height >> width;
	if (height == width || height > width + DIFFER_OF_RECTANGLE || width > height + DIFFER_OF_RECTANGLE)
		cout << "Area of rectangle is : " << height * width << endl;//area of rectangle or square
	else
		cout << "Perimeter of rectangle is: " << height * 2 + width * 2 << endl;//perimeter of rectangle
}

void triangleTower()
{
	int height, width;
	cout << "Enter height and width of tower" << endl;
	// Correct input is guaranteed
	cin >> height >> width;

	int choice;
	cout << "1- Calculate the perimeter of the triangle   2- Print the triangle" << endl;
	cin >> choice;
	switch (choice)
	{
	case 1:
		//perimeter of isosceles triangle using Pythagorean theorem
		cout << "Perimeter of triangle is: " << width + sqrt(pow(width, 2) + 4 * pow(height, 2)) << endl;
		break;
	case 2:
		printTriangle(height, width);
		break;
	}
}

void printTriangle(int height, int width)
{
	if (width % 2 == 0 || width > height * 2)
	{
		cout << "can not print this triangle" << endl;
		return;
	}
	int space = width / 2;
	//printing first line
	for (int i = 0; i < space; i++)
		cout << " ";
	cout << "*" << endl;
	space--;
	int stars = 3;
	int numOfGroups = (width - 2) / 2;
	int repeatLines = (height - 2) / numOfGroups;
	//printing extra lines for first group if there are
	for (int i = 0; i < (height - 2) % numOfGroups; i++)
	{
		for (int h = 0; h < space; h++)
			cout << " ";
		for (int h = 0; h < stars; h++)
			cout << "*";
		cout << endl;
	}
	//printing rest of groups
	for (int i = 0; i < numOfGroups; i++)
	{
		for (int j = 0; j < repeatLines; j++)
		{
			for (int h = 0; h < space; h++)
				cout << " ";
			for (int h = 0; h < stars; h++)
				cout << "*";
			cout << endl;
		}
		space--;
		stars += 2;
	}
	//printing last line
	for (int i = 0; i < width; i++)
		cout << "*";
	cout << endl;
}