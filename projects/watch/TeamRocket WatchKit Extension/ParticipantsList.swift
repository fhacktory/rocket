//
//  ParticipantsList.swift
//  TeamRocket WatchKit Extension
//
//  Created by Nicolas Lebrun on 12/10/2019.
//  Copyright © 2019 Nicolas Lebrun. All rights reserved.
//

import SwiftUI
import Starscream

struct ParticipantsList: View {
    @EnvironmentObject var moneyCounter: MoneyCounter

    var body: some View {
        List(moneyCounter.state!.persons) { person in
            Text("\(person.name) : \(person.totalCost)")
        }
    }
}

struct ParticipantsList_Previews: PreviewProvider {
    static var previews: some View {
        ParticipantsList().environmentObject(MoneyCounter())
    }
}
