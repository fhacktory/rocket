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
            NavigationLink(destination: ParticipantsList().environmentObject(moneyCounter)) {
                Image(systemName: "person.2.fill").imageScale(.large)
            }
            HStack {
                Text("\(moneyCounter.state?.remainingTime ?? "-") 🕔").bold().font(.system(size: 16))
                Spacer()
                Text("\(moneyCounter.moneyDescription) €").bold().font(.system(size: 25))
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
            if moneyCounter.state?.remainingTime == "0:0" || moneyCounter.meetingShouldEnd {
                Button(action: {
                    self.moneyCounter.launchRocket()
                    print("Fired !")
                }, label: {
                    Text("Fire 🚀")
                    .font(.system(size: 30))
                })
            }
        }.navigationBarTitle(Text("Réunion"))
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView().environmentObject(MoneyCounter())
    }
}
