#include <iostream>
#include "copyright.h"
#include "functions.h"

using namespace std;

double input(const string &message){
    double argument;
    cout << message << endl;
    cin >> argument;
    if(!cin){
        cin.clear();
        throw runtime_error("Error. Value does not fit");
    }
    return argument;
}

double accuracy(){
    double epsilon = 1E-3, x1 = a, x2 = b, y = 1E-6, accuracy = 0, maxValue = 0;
    while (x1 < x2){
        accuracy = abs(S(x1, epsilon) - f(x1));
        if (maxValue < accuracy) maxValue = accuracy;
        x1 += y;
    }
    return maxValue;
}

int main(){
    double x, epsilon, result;
    copyright();
    cout << "Variant 13. This program calculates the value of the expression, which depends on several parameters" << endl;
    cout.precision(10);
    cout << fixed << "***** accuracy = " << accuracy() << endl;
    try{
        x = input("Enter x on segment [-1;1]: ");
        if(x < a || x > b) throw domain_error("Error. x out of domain");
        epsilon = input("Enter epsilon (E > 0): ");
        if(epsilon <= 0) throw domain_error("Error. epsilon isn't positive");
        cout << "***** do calculations ... ";
        result = S(x, epsilon);
        cout << "done" << endl;
        cout.precision(4);
        cout << "for x = " << x << endl;
        cout.precision(10);
        cout << "result = " << result << endl;
    } catch(runtime_error &exept){
        cout << exept.what() << endl;
    } catch(domain_error &exept){
        cout << exept.what() << endl;
    }
	return 0;
}
