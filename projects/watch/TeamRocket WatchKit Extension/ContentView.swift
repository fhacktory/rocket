//
//  ContentView.swift
//  TeamRocket WatchKit Extension
//
//  Created by Nicolas Lebrun on 12/10/2019.
//  Copyright © 2019 Nicolas Lebrun. All rights reserved.
//

import SwiftUI
import Starscream

struct ContentView: View {
    @EnvironmentObject var moneyCounter: MoneyCounter

    var body: some View {
        List {
            Text("💸 \(moneyCounter.moneyDescription) €")
            if moneyCounter.money > 300.0 {
                Button(action: {
                    print("Fired !")
                }, label: {
                    Text("💥")
                    .font(.system(size: 100))
                })
            } else {
                Button(action: {
                    self.moneyCounter.startTimer()
                }, label: {
                    Text("🚀")
                    .font(.system(size: 40))
                })
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView().environmentObject(MoneyCounter())
    }
}
