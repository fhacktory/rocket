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
    @State var timerStarted: Bool = false

    var body: some View {
        VStack {
            Text("Meeting Cost").font(.system(size:30))
            HStack {
                Text("\(moneyCounter.moneyDescription) €").bold().font(.system(size: 25))
                Spacer()
                Text("💸").font(.system(size:30))
            }.padding()
            if !timerStarted {
                Button(action: {
                    self.moneyCounter.startTimer()
                    self.timerStarted = true
                }, label: {
                    HStack {
                        Text("Start").foregroundColor(Color.blue).font(.system(size:20))
                        Spacer()
                        Image(systemName: "play").imageScale(.large).foregroundColor(Color.blue)
                    }.padding()
                })
            }
            if moneyCounter.money > 3.0 {
                Button(action: {
                    self.moneyCounter.launchRocket()
                    print("Fired !")
                }, label: {
                    Text("Fire someone 💥")
                    .font(.system(size: 50))
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
